import {Col, Row} from "antd";
import style from "./Citation.module.css";
import React from "react";

const Citation = ({data}) => {
  const zoteroObject = data['zotero_data'] !== "" ? JSON.parse(data['zotero_data']) : {};

  const renderAuthor = () => {
    if (zoteroObject.hasOwnProperty('creators')) {
      const authors = zoteroObject['creators'].map((creator) => {
        return `${creator['firstName']} ${creator['lastName']}`
      });
      return authors.join(', and ')
    }
  };

  const renderDate = () => {
    if (zoteroObject.hasOwnProperty('date')) {
      return ` ${zoteroObject['date']}.`
    }
  };

  const renderPublisher = () => {
    if (zoteroObject.hasOwnProperty('publisher')) {
      return ` ${zoteroObject['publisher']},`
    }
  };

  const renderJournalTitle = () => {
    if (zoteroObject.hasOwnProperty('publicationTitle')) {
      const journal = `${zoteroObject['publicationTitle']}`;
      const volume = `${zoteroObject['volume'] && zoteroObject['volume'] !== "" ? ` vol. ${zoteroObject['volume']}, ` : ""}`;
      const issue = `${zoteroObject['issue'] && zoteroObject['issue'] !== "" ? `no. ${zoteroObject['issue']}, ` : ""}`;
      return <React.Fragment> <span>{journal}</span>{volume}{issue}</React.Fragment>
    }
  };

  const renderCitation = () => {
    if (data.hasOwnProperty('zotero_data')) {
      const zoteroObject = data['zotero_data'] !== "" ? JSON.parse(data['zotero_data']) : {};
      if (zoteroObject.hasOwnProperty('publicationTitle')) {
          return (
            <div className={style.CitationText}>
              {renderAuthor()}. "{data.title}"{renderJournalTitle()}{renderDate()}
            </div>
          )
      }

      if (zoteroObject.hasOwnProperty('bookTitle')) {
        return (
          <div className={style.CitationText}>
            {renderAuthor()}. <span>{data.title}.</span>{renderPublisher()}{renderDate()}
          </div>
        )
      }

      return (
        <div className={style.CitationText}>
          {renderAuthor()}. <span>{data.title}.</span>{renderDate()}
        </div>
      )
    }
    return ""
  };

  return (
    <Row>
      <Col xs={0} md={4}/>
      <Col xs={24} md={16}>
        <div className={style.CitationBox}>
          <div className={style.CitationTitle}>Suggested citation</div>
          {renderCitation()}
        </div>
      </Col>
      <Col xs={0} md={4}/>
    </Row>
  )
};

export default Citation;
