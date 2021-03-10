import {Spin} from "antd";
import style from "./Citation.module.css";
import React from "react";
import useSWR from "swr";
import {API, fetcher} from "../../utils/api";

const Citation = ({documentID}) => {
  const { data, error } = useSWR(document ? `${API}/document/citation/${documentID}` : null, fetcher);

  return (
    <React.Fragment>
      {
        data ?
          <div className={style.CitationBox}>
            <dl>
              <dt>Suggested Citation</dt>
              <dd>
                <div dangerouslySetInnerHTML={{ __html: data['citation']}}/>
              </dd>
            </dl>
          </div>
        : <Spin>
            <div className={style.CitationBox} style={{height: '100px'}} />
          </Spin>
      }
    </React.Fragment>
  )
};

export default Citation;
