import style from "./Document.module.css";
import {Button, Col, Drawer, Row} from "antd";
import React, {useState} from "react";
import {API} from "../../utils/api";
import Collapse from "@kunukn/react-collapse";
import Link from "next/link";
import Citation from "./Citation";
import AuthorityRecord from "./AuthorityRecord";
import {useRouter} from "next/router";

const Document = ({data}) => {
  const router = useRouter()

  const [viewerOpen, setViewerOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  const displayZoteroField = (label, zoteroField) => {
    if (data.hasOwnProperty('zotero_data')) {
      const zoteroObject = data['zotero_data'] !== "" ? JSON.parse(data['zotero_data']) : {};
      switch (zoteroField) {
        case 'author':
          let d = "";
          if (zoteroObject.hasOwnProperty('creators')) {
            const authors = zoteroObject['creators'].map((creator) => {
              return `${creator['firstName']} ${creator['lastName']} (${creator['creatorType']})`
            });
            d = authors.join('; ');
          }
          return renderData(d, label, zoteroField);
        case 'publicationTitle':
          if (zoteroObject.hasOwnProperty('publicationTitle')) {
            const journal = `${zoteroObject['publicationTitle']}`;
            const volume = `${zoteroObject['volume'] && zoteroObject['volume'] !== "" ? ` vol. ${zoteroObject['volume']}` : ""}`;
            const issue = `${zoteroObject['issue'] && zoteroObject['issue'] !== "" ? `/${zoteroObject['issue']}` : ""}`;
            return renderData(`${journal}${volume}${issue}`, label, zoteroField)
          }

          if (zoteroObject.hasOwnProperty('bookTitle')) {
            return renderData(`${zoteroObject['bookTitle']}`, label, zoteroField);
          }
          break;
        default:
          return displayData(zoteroObject, label, zoteroField)
      }
    }
  };

  const displayClassificationField = (label, field) => {
    const {classifications} = data;
    if (classifications) {
      const cl = classifications.filter(c => c['category_key'] === field);
      const values = cl.map(c => c['field_type'] === 'tag' ? c['full_name'] : `Other: ${c['text']}`);
      if (values.length > 0) {
        return renderData(values, label, field, false, true)
      }
    }
  };

  const displayAuthorityField = (label, field, displayKey) => {
    const displayAuthorityValue = (d, idx) => {
      return (
        <React.Fragment>
          <a onClick={
            () => {
              setSelectedRecord({
                drawerTitle: d[displayKey],
                field: field,
                id: d.id,
                recordType: field,
              });
              setDrawerOpen(true);
            }}>
            {idx < data[field].length - 1 ? `${d[displayKey]}; ` : d[displayKey]}
          </a>
        </React.Fragment>
      )
    };

    if (data.hasOwnProperty(field)) {
      if (data[field].length > 0) {
        return (
          <dl>
            <dt>{label}</dt>
            <dd>
              {data[field].map((d, idx) => (
                  displayAuthorityValue(d, idx)
              ))}
            </dd>
          </dl>
        )
      }
    }
  };

  const displayField = (label, field, html) => {
    return displayData(data, label, field, html);
  };

  const displayArrayField = (label, field) => {
    if (data.hasOwnProperty(field)) {
      if (data[field].length > 0) {
        return renderData(data[field].join('; '), label, field)
      }
    }
  };

  const displayArrayOfObjField = (label, field, key) => {
    if (data.hasOwnProperty(field)) {
      if (data[field].length > 0) {
        return renderData(data[field].map(d => d[key]).join("; "), label, field)
      }
    }
  };


  const renderData = (data, label, field, html=false, facet=false) => {
    const renderValue = (d) => {
      const facet_field = `${field}`;
      const content = html ? <div dangerouslySetInnerHTML={{ __html: d}}/> : d;

      if (facet && !content.includes('Other:')) {
        return (
          <React.Fragment>
            <Link href={{
              pathname: '/search',
              query: {[facet_field]: d}
            }}>
              {content}
            </Link>
            <br/>
          </React.Fragment>
        )
      } else {
        return (
          <React.Fragment>
            {content}<br/>
          </React.Fragment>
        )
      }

    };

    if (Array.isArray(data)) {
      return (
        <dl>
          <dt>{label}</dt>
          <dd>
            {data.map((d) => (
              renderValue(d)
            ))}
          </dd>
        </dl>
      )
    } else {
      if (data !== "") {
        return (
          <dl>
            <dt>{label}</dt>
            <dd>
              {renderValue(data)}
            </dd>
          </dl>
        )
      }
    }
  };

  const displayData = (data, label, field, html) => {
    if (data.hasOwnProperty(field)) {
      if (data[field] !== "") {
        return (
          <dl>
            <dt>{label}</dt>
            <dd>
              {html ? <div dangerouslySetInnerHTML={{ __html: data[field]}}/> : data[field]}
            </dd>
          </dl>
        )
      }
    }
  };

  const renderAttachment = () => {
    if (data['attachment_type'] === 'default') {
      const file_id = data['files'][0]['file_id'];
      return (
        <React.Fragment>
          <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <Button
              type="primary" onClick={() => setViewerOpen(!viewerOpen)}
            >{viewerOpen ? 'Close Attachment' : 'Open Attachment'}</Button>
          </div>
          <Collapse isOpen={viewerOpen}>
            <div style={{marginBottom: '30px'}}>
              <object
                data={`${API}/view_file/${file_id}`}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            </div>
          </Collapse>
        </React.Fragment>
      )
    }
  };

  const onFilter = (value, field) => {
    setDrawerOpen(false);
    router.push({
      pathname: '/search',
      query: {[field]: value}
    })
  };

  return (
    <div className={style.RecordWrap}>
      <Row>
        <Col xs={0} sm={2}/>
        <Col xs={24} sm={20}>
          <div className={style.Title}>
            <h1>
              {data.title}
            </h1>
          </div>
        </Col>
        <Col xs={0} sm={2}/>
      </Row>
      <Row>
        <Col xs={0} sm={2}/>
        <Col xs={24} sm={20}>
          {renderAttachment()}
        </Col>
        <Col xs={0} sm={2}/>
      </Row>
      <Row>
        <Col xs={0} sm={2}/>
        <Col xs={24} sm={20}>
          {displayField("Item Type", "item_type")}
          {displayZoteroField("Publication title", "publicationTitle")}
          {displayZoteroField("Author", "author")}
          {displayZoteroField("Date", "date")}
          {displayZoteroField("Language", "language")}
          {displayZoteroField("Archive", "archive")}
          {displayZoteroField("Archive Location", "archiveLocation")}
          {displayField("Abstract", "abstract", true)}
          {displayArrayField("Other keywords for document", "keywords")}
          {displayAuthorityField('Events', "events", 'event_full')}
          {displayAuthorityField('People', "people", 'place_full')}
          {displayAuthorityField('Organizations', "organisations", 'full_name')}
          {displayAuthorityField('Places', "places", 'full_name')}
          {displayClassificationField("Historical context", "historical_context")}
          {displayClassificationField("Labour conditions", "labour_conditions")}
          {displayClassificationField("Living conditions", "living_conditions")}
          {displayClassificationField("Labour relations", "labour_relations")}
          {displayClassificationField("Repertoire action", "activist_repertoire")}
          {displayClassificationField("Agendas", "agendas")}
          {displayClassificationField("Scale of repertoire actions", "activist_repertoire_scale")}
          {displayClassificationField("Format of participation", "format_of_participation")}
          {displayClassificationField("Communication and knowledge production", "knowledge_production")}
          <Citation documentID={data.id}/>
        </Col>
        <Col xs={0} sm={2}/>
      </Row>
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
    </div>
  )
};

export default Document;
