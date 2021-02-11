import AppLayout from "../components/Layout/Layout";
import React from "react";
import Head from "next/dist/next-server/lib/head";
import {Col, Row} from "antd";
import style from "../styles/staticpages.module.css";

export default function Imprint() {
  return (
    <AppLayout withBackground={true}>
      <Head>
        <title>ZARAH - Imprint</title>
      </Head>
      <div className="container">
        <div className={style.Wrap}>
          <Row>
            <Col xs={0} sm={2}/>
            <Col xs={24} sm={20}>
              <div className={style.Title}>
                <h1>Imprint</h1>
              </div>
              <h2>Responsible Publisher</h2>
              Lukas Neissl<br/>
              ZARAH Program Manager<br/>
              Central European University<br/>
              Quellenstraße 51-55<br/>
              1100 Vienna<br/>
              Austria<br/>
              NeisslL@ceu.edu<br/><br/>
              Copyright © ZARAH<br/><br/>
              All rights reserved. All texts, images or any other content of this website is protected by copyright
              laws. Any reproduction is strictly prohibited without prior written consent.<br/>
              <h2>Disclaimer</h2>
              Although all the information on the website has been checked thoroughly, it is disseminated for
              information purposes only. We take the necessary technical and organisational measures to ensure
              the accuracy of the information, yet the publisher cannot be held responsible for the accuracy of
              the provided information nor give a guarantee that the details are complete, accurate and current.
              All information is provided subject to modification, error or omission. Links to other websites have
              been carefully selected. However, the publisher is not responsible for contents on any other websites.
              Finally, the publisher shall not be held liable for and makes no warranty in the event of interruption
              or malfunction of the site. The publisher cannot be held responsible for direct or indirect damage
              incurred by the user as a result of access to the website and its use.
            </Col>
            <Col xs={0} sm={2}/>
          </Row>
        </div>
      </div>
    </AppLayout>
  )
}
