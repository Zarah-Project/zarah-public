import React, {useState} from "react";
import {Col, Drawer, Row} from "antd";
import style from "./ResultPageList.module.css"
import Image from "next/image";
import Highlight from "../Highlight/Highlight";
import AuthorityRecord from "../../Document/AuthorityRecord";
import {useRouter} from "next/router";

const ResultPageList = ({data, highlights}) => {
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  const renderThumbnail = (d) => {
    if (d['attachment_type'] === 'default') {
      return (
        <a href={`/document/${d.id}`}>
          <div className={style.Thumbnail}>
            <Image
              width={50}
              height={50}
              src={'/images/pdf-icon.png'}
            />
          </div>
        </a>
      )
    } else {
      return (
        <a href={`/document/${d.id}`}>
          <div className={style.Thumbnail}>
            <span className={style.ThumbnailRestricted}>PDF - Restricted Access</span>
          </div>
        </a>
      )
    }
  };

  const renderAuthorityThumbnail = (facetID, facetText, record_type) => {
    switch (record_type) {
      case 'person':
        return (
          <a href={`/special-records/${record_type}/${facetID}`}>
            <div className={style.Thumbnail}>
              <span className={style.ThumbnailRestricted}>Special Records<br/>Person</span>
            </div>
          </a>
        );
      case 'organisation':
        return (
          <a href={`/special-records/${record_type}/${facetID}`}>
            <div className={style.Thumbnail}>
              <span className={style.ThumbnailRestricted}>Special Records<br/>Organization</span>
            </div>
          </a>
        );
      case 'place':
        return (
          <a href={`/special-records/${record_type}/${facetID}`}>
            <div className={style.Thumbnail}>
              <span className={style.ThumbnailRestricted}>Special Records<br/>Place</span>
            </div>
          </a>
        );
      case 'event':
        return (
          <a href={`/special-records/${record_type}/${facetID}`}>
            <div className={style.Thumbnail}>
              <span className={style.ThumbnailRestricted}>Special Records<br/>Event</span>
            </div>
          </a>
        );
    }
  };

  const renderSearchHit = (d) => {
    if (highlights.hasOwnProperty(d.id)) {
      const h = highlights[d.id];
      if (Object.keys(h).length > 0) {
        return (
          <div className={style.Highlight}>
            <Highlight data={h}/>
            <a className={style.More} href={`/document/${d.id}`}>
              more >>
            </a>
          </div>
        )
      }
    }
  };

  const renderSpecialSearchHit = (d, id) => {
    if (highlights.hasOwnProperty(d.id)) {
      const h = highlights[d.id];
      if (Object.keys(h).length > 0) {
        return (
          <div className={style.Highlight}>
            <Highlight data={h}/>
            <a href={`/special-records/${d['record_type']}/${id}`}>
              more >>
            </a>
          </div>
        )
      }
    }
  };

  const renderDocument = (idx, d) => (
    <Row style={{marginBottom: '40px'}} key={idx}>
      <Col xs={4}>
        {renderThumbnail(d)}
      </Col>
      <Col xs={20}>
        <div className={style.ResultItemData}>
          <div className={style.Title}>
            <a href={`/document/${d.id}`}>
              {d['title']}
            </a>
          </div>
          <div>
            {d['date']}
          </div>
          {
            d.hasOwnProperty('author') ?
              <div>
                {d['author']}
              </div> : ''
          }
          {
            d.hasOwnProperty('publication') ?
              <div>
                {d['publication']}
              </div> : ''
          }
          <div className={style.ItemType}>
            {d['item_type']}
          </div>
          {
            d.hasOwnProperty('archive') ?
              <div>
                <i>{d['archive']}</i>
              </div> : ''
          }
          {
            d.hasOwnProperty('archive_location') ?
              <div>
                <i>{d['archive_location']}</i>
              </div> : ''
          }
          <div>
            <React.Fragment>
              {renderSearchHit(d)}
            </React.Fragment>
          </div>
        </div>
      </Col>
    </Row>
  );

  const onSpecialRecordClick = (facetID, facetText, record_type) => {
    let api = '';
    switch (record_type) {
      case 'person':
        api = 'people';
        break;
      case 'organisation':
        api = 'organisations';
        break;
      case 'event':
        api = 'events';
        break;
      case 'place':
        api = 'places';
        break;
      default:
        break;
    }

    setSelectedRecord({
      drawerTitle: facetText,
      field: api,
      id: facetID,
      recordType: api,
    });
    setDrawerOpen(true);
  };

  const onFilter = (value, field) => {
    setDrawerOpen(false);
    router.push({
      pathname: '/search',
      query: {[field]: value}
    })
  };

  const renderSpecialRecord = (idx, d) => {
    const lastIndex = d['id'].lastIndexOf('_');
    const id = d['id'].substring(lastIndex + 1);
    const name = d['name'];

    const recordType = d['record_type'] === 'organisation' ? 'Organization' : _.startCase(d['record_type']);

    return (
      <Row style={{marginBottom: '40px'}} key={idx}>
        <Col xs={4}>
          {renderAuthorityThumbnail(id, name, d['record_type'])}
        </Col>
        <Col xs={20}>
          <div className={style.ResultItemData}>
            <div className={style.Title}>
              <a href={`/special-records/${d['record_type']}/${id}`}>
                {d['name']}
              </a>
            </div>
            <div className={style.ItemType}>
              {`Special Record (${recordType})`}
            </div>
            <div>
              <React.Fragment>
                {renderSpecialSearchHit(d, id, name)}
              </React.Fragment>
            </div>
          </div>
        </Col>
      </Row>
    )
  };

  const results = data.map((d, idx) => {
    if (d['record_type'] === 'document') {
      return renderDocument(idx, d)
    } else {
      return renderSpecialRecord(idx, d)
    }
  });

  return (
    <Row>
      <Col xs={24}>
        {results}
      </Col>
      <Drawer
        title={selectedRecord['drawerTitle']}
        placement="right"
        closable={true}
        onClose={() => setDrawerOpen(false)}
        width={'40%'}
        visible={drawerOpen}
        className={style.Drawer}
      >
        <AuthorityRecord record={selectedRecord} onFilter={onFilter} />
      </Drawer>
    </Row>
  )
};

export default ResultPageList;
