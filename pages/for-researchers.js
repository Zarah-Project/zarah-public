import AppLayout from "../components/Layout/Layout";
import React from "react";
import Head from "next/dist/next-server/lib/head";
import {Col, Row} from "antd";
import style from "../styles/staticpages.module.css";
import {API} from "../utils/api";

export default function ForResearchers() {
  return (
    <AppLayout withBackground={true}>
      <Head>
        <title>ZARAH DB - For Researchers</title>
      </Head>
      <div className="container">
        <div className={style.Wrap}>
          <Row>
            <Col xs={0} sm={2}/>
            <Col xs={24} sm={20}>
              <div className={style.Title}>
                <h1>For Researchers</h1>
              </div>
              <div style={{marginBottom: '30px'}}>
                <object
                  data={`/pdf/ZARAH_DB_-_For_Researchers_2021-06-30.pdf`}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
              </div>
            </Col>
            <Col xs={0} sm={2}/>
          </Row>
        </div>
      </div>
    </AppLayout>
  )
}
