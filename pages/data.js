import AppLayout from "../components/Layout/Layout";
import React from "react";
import Head from "next/head";
import {Col, Row} from "antd";
import style from "../styles/staticpages.module.css";

export default function About() {
  return (
    <AppLayout withBackground={true}>
      <Head>
        <title>ZARAH DB - Data</title>
      </Head>
      <div className="container">
        <div className={style.Wrap}>
          <Row>
            <Col xs={0} sm={2}/>
            <Col xs={24} sm={20}>
              <div className={style.Title}>
                <h1>Data</h1>
              </div>
              ZARAH DB makes research data openly accessible with reference to
              the <a href={"https://www.force11.org/group/fairgroup/fairprinciples"} target={"_blank"}>FAIR Data Principles</a>.
              As part of making ZARAH DB data FAIR (Findable, Accessible, Interoperable and Reusable), we make metadata
              files available to enable researchers’ further engagement with the projects’ findings, as they accumulate
              until 2025. In addition, once the ZARAH project ends, the entire metadata package of ZARAH DB will also be
              deposited in a separate specialized repository.<br/><br/>
              Public data in ZARAH DB are accessible in pre-rendered formats (CSV files, JSON), meant to allow users
              to create different data visualizations and perform network analysis. Metadata from search results will
              be exportable in JSON format for further data analysis.<br/><br/>
              Researchers interested in accessing our metadata for further analysis are asked to contact the ZARAH
              project via email (zarahdb@ceu.edu).
            </Col>
            <Col xs={0} sm={2}/>
          </Row>
        </div>
      </div>
    </AppLayout>
  )
}
