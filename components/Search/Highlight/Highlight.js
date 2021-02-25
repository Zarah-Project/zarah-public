import style from "./Highlight.module.css";
import React, {useState} from "react";

const facetLabels = {
  attachment_text_search: 'PDF',
  abstract_search: 'Abstract',
  authority_search: 'Authority Entries',
  zotero_search: 'Zotero Data',
  classification_search: 'Assigned Metadata',
  keyword_search: 'Keyword'
};

const Highlight = ({data}) => {
  return (
    Object.keys(data).map((key, idx) => {
      if (facetLabels.hasOwnProperty(key)) {
        return (
          <div key={idx} className={style.Highlight}>
            <div key={idx} dangerouslySetInnerHTML={{__html: `<span>${facetLabels[key]}:</span> ${data[key]}`}}/>
          </div>
        )
      } else {
        return ''
      }
    }))
};

export default Highlight;
