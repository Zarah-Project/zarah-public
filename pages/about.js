import AppLayout from "../components/Layout/Layout";
import React from "react";
import Head from "next/head";
import {Col, Row} from "antd";
import style from "../styles/staticpages.module.css";

export default function About() {
  return (
    <AppLayout withBackground={true}>
      <Head>
        <title>ZARAH DB - About</title>
      </Head>
      <div className="container">
        <div className={style.Wrap}>
          <Row>
            <Col xs={0} sm={2}/>
            <Col xs={24} sm={20}>
              <div className={style.Title}>
                <h1>About</h1>
              </div>
              ZARAH DB is a collection of research data and reproductions of original documents on the broad theme of
              Women’s Labour Activism in Eastern Europe and Internationally from the Age of Empires to the 1990s.
              The database is associated with the research project <a href={"https://zarah-ceu.org/"} target={"_blank"}>ZARAH, ERC Advanced Grant
              (Grant agreement No. 833691, 2020-2025)</a>. ZARAH explores the history of women’s labour activism and
              organizing to improve labour conditions and life circumstances of lower and working-class women and
              their communities. It discusses local, nation-wide, border-crossing and international contexts,
              networks and organizations. The project incorporates a rich variety of activisms, ranging from
              grass-root initiatives to social and political action within public and private institutions,
              and from anarchist radicalism and working women’s involvement in co-operatives and trade unions
              to cross-class women’s organizing.<br/><br/>
              The ZARAH database brings together research data generated by the ZARAH team in connection with
              their <a href={"https://zarah-ceu.org/team-members/"} target={"_blank"}>component studies</a>,
              and other key sources documenting women’ labour activism internationally and across
              the large region studied by ZARAH. Whenever possible, the documents, which include texts and interviews
              in many languages, as well as pictures and other types of sources, are made available in open access
              mode in ZARAH DB. English-language abstracts and keywords give information about each document.
              The database is searchable for chronology, events, places, activist individuals, and keywords contained
              in the metadata and the documents. The metadata and research data give results of the analysis of the
              documents through the lens of key categories in, and approaches to, the study of the history of women’s
              labour activism; we pay particular attention to activist repertoires and agendas, organizational forms,
              historical contexts, frameworks and effects of activism, and women’s paid and unpaid work and their
              living conditions.<br/><br/>
              ZARAH DB will be fed with documents and research data throughout the ZARAH research period (2020-2025).
              The database will remain online for another five years after the end of the project and be transferred
              to a scholarly repository upon completion.<br/><br/>
              With ZARAH DB, the ZARAH team shares documents, and information about documents (and on how to find them)
              in many languages, and provide a glimpse into a collective research process. By bringing together and
              making this information searchable in a systematic manner we aim to serve the community of researchers,
              students, and activists in Eastern Europe and around the world interested in women’s labour activism,
              and hope to contribute to the conversation on the past and present of such activism.
            </Col>
            <Col xs={0} sm={2}/>
          </Row>
        </div>
      </div>
    </AppLayout>
  )
}
