import AppLayout from "../components/Layout/Layout";
import React from "react";
import Head from "next/dist/next-server/lib/head";
import {Col, Row} from "antd";
import style from "../styles/staticpages.module.css";

export default function PrivacyNotice() {
  return (
    <AppLayout withBackground={true}>
      <Head>
        <title>ZARAH DB - Privacy Notice</title>
      </Head>
      <div className="container">
        <div className={style.Wrap}>
          <Row>
            <Col xs={0} sm={2}/>
            <Col xs={24} sm={20}>
              <div className={style.Title}>
                <h1>Privacy Notice</h1>
                <h2>Provider of this website</h2>
                Central European University<br/>
                Quellenstraße 51-55<br/>
                1100 Vienna<br/>
                Austria<br/>
                <a href={'mailto:NeissL@ceu.edu'}>NeisslL@ceu.edu</a><br/><br/>
                Our website address is: <a href={'https://public.zarahdb.eu'} target={'_blank'}>https://public.zarahdb.eu</a><br/><br/>
                The provider of this website places great emphasis on the protection of your personal information and
                compliance with the EU General Data Protection Regulation (GDPR). This privacy notice relates to the
                collection, use, transfer and retention of your personal data.<br/>
                <h2>Dealing with personal data</h2>
                Personal data is information that can be used to identify a person, i.e. information that can be traced
                back to a person. This includes the name, email address or phone number. Personal data also includes
                data about preferences, hobbies, memberships or which websites were viewed by someone.<br/><br/>
                A transfer of private data stored by us to third parties without your explicit permission is excluded.<br/>
                <h2>Security of your data</h2>
                We are committed to holding your data securely and treating it with sensitivity. All data are held
                securely and in accordance with the relevant data privacy laws and our internal policies.<br/>
                <h2>What kind of personal data do we collect and why we collect it</h2>
                <h3>Contact</h3>
                When contacting via email, your personal details (email address, name) are stored for the purpose of
                processing your request and in the event that follow-up questions arise.<br/><br/>
                We store personal data exclusively for the purposes mentioned here for the duration of the consent of
                the person concerned, which can be revoked at any time.<br/>
                <h3>Server Log Files</h3>
                The provider of the website collects data about every access to the website
                (so-called server log files). The access data include:<br/><br/>
                Name of the accessed website, file, date and time of access, amount of data transferred, notification
                of successful access, browser type and version, the user’s operating system, referrer URL
                (the previously visited page), IP address and the requesting provider.<br/><br/>
                The provider uses the log data only for statistical evaluations for the purpose of operation,
                security and optimization of the offer. However, the provider reserves the right to check the log
                data retrospectively, if there are reasonable grounds for suspecting illegal use.<br/>
                <h3>Cookies</h3>
                Cookies are small files that make it possible to store specific information related to the device on
                the user’s access device (PC, smartphone or similar). On the one hand, they serve the user-friendliness
                of websites and thus the users (e.g. storage of login data). On the other hand, they can serve to
                record the statistical data of the website usage and to be able to analyze them in order to improve
                the offer. Users can influence the use of cookies. Most browsers have an option that limits or
                completely prevents the storage of cookies.<br/><br/>
                ZARAH is not using cookies on their public site.<br/>
                <h2>What are your rights?</h2>
                You have a right<br/><br/>
                <ul>
                  <li>to access your personal information,</li>
                  <li>to object to the processing of your personal information,</li>
                  <li>to rectify,</li>
                  <li>to erase and</li>
                  <li>to restrict processing your personal information.</li>
                  <li>If you wish to exercise any of these rights, please email NeisslL@ceu.edu. We will make every effort to fulfill your request to the extent allowed by law and will respond in writing within 30 days of receiving your request.</li>
                </ul>
                <h2>Future changes</h2>
                If our information policies or practices change at some time in the future, we will post the changes here.<br/>
                Last updated on: February 10, 2021
              </div>
            </Col>
            <Col xs={0} sm={2}/>
          </Row>
        </div>
      </div>
    </AppLayout>
  )
}
