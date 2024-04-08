import AppLayout from "../components/Layout/Layout";
import React from "react";
import Head from "next/head";
import {Col, Row} from "antd";
import style from "../styles/staticpages.module.css";

export default function TermsOfUse() {
  return (
    <AppLayout withBackground={true}>
      <Head>
        <title>ZARAH DB - Terms of Use</title>
      </Head>
      <div className="container">
        <div className={style.Wrap}>
          <Row>
            <Col xs={0} sm={2}/>
            <Col xs={24} sm={20}>
              <div className={style.Title}>
                <h1>Terms of Use</h1>
              </div>
              Material contained in ZARAH DB (i.e. bibliographical information, document descriptions,
              assigned keywords, reproductions of documents, transcripts of interviews, etc.) is provided by
              ZARAH researchers and a number of contributing institutions and individuals. The interviews and
              reproductions of documents contained in ZARAH DB may only be used in compliance with the rights
              and terms of use displayed next to the entries and as long as the appropriate credit is given.
              If no information about rights and terms of use is displayed next to an entry, reproductions of
              documents and interviews may only be used in accordance with the applicable laws.
              To request permission, and for further enquiries, please contact the institution or individual
              that holds the original.<br/><br/>
              All content (metadata, abstracts, and other descriptions) available in ZARAH DB, created by
              ZARAH team members, as well as graphics, and the arrangements of texts, images, and graphics
              by the ZARAH DB designers are subject to copyright protection and other protective laws.
              They may be used in accordance with the applicable copyright laws and scientific practice,
              but may not be copied, distributed, altered, or made accessible to third parties for
              commercial purposes.<br/><br/>
              All rights reserved.<br/><br/>
              Updated in October 2022.<br/><br/>
              <h2>Contact</h2>
              You can contact us via <a href={"mailto:zarahdb@ceu.edu"}>zarahdb@ceu.edu</a>
            </Col>
            <Col xs={0} sm={2}/>
          </Row>
        </div>
      </div>
    </AppLayout>
  )
}
