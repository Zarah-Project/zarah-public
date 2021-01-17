import React from "react";
import {Carousel, Col, Row} from "antd";
import style from "./ResultPageList.module.css"
import Image from "next/image";

const ResultPageList = ({data}) => {
  const renderDates = (startDate, endDate) => {
    if (endDate) {
      if (startDate !== endDate) {
        return `(${startDate} - ${endDate})`
      } else {
        return `(${startDate})`
      }
    } else {
      return `(${startDate})`
    }
  };

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

  const results = data.map((d, idx) => (
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
        </div>
      </Col>
    </Row>
  ));

  return (
    <Row>
      <Col xs={24}>
        {results}
      </Col>
    </Row>
  )
};

export default ResultPageList;
