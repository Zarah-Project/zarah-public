import style from "./AuthorityRecordCitation.module.css";
import React from "react";

const AuthorityRecordCitation = ({title, type}) => {
  return (
    <React.Fragment>
      {
        <div className={style.CitationBox}>
          <dl>
            <dt>Citation</dt>
            <dd>
              {title}. Special Record ({type}). Retrieved from ZARAH DB database.
            </dd>
          </dl>
        </div>
      }
    </React.Fragment>
  )
};

export default AuthorityRecordCitation;
