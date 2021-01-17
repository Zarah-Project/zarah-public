import {Col, Layout, Row} from "antd";
import React from "react";
import style from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";

const {Footer} = Layout;

const LayoutFooter = () => {
  return (
    <Footer className={style.Footer}>
      <Row>
        <Col xs={24} lg={6}>
          <div className={style.Info}>
            This project has received funding from
            the <a href={"https://erc.europa.eu/"} target="_blank">European Research Council (ERC)</a> under
            the European Union’s Horizon 2020 research and innovation programme
            (Grant agreement No. 833691 – ZARAH)
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
              <div className={style.Image}>
                <Image width={120} height={120} src='/images/eu-logo.png'/>
              </div>
              <div className={style.Image} style={{borderLeft: '1px solid'}}>
                <Image width={120} height={120} src='/images/erc-logo.png'/>
              </div>
              <div className={style.Image} style={{borderLeft: '1px solid'}}>
                <Image width={250} height={120} src='/images/ceu-logo.png'/>
              </div>
          </div>
        </Col>
        <Col xs={24} lg={6}>
          <div className={style.Info}>
            <Link href={'/privacy-notice'}>Privacy Notice</Link><br/>
            <Link href={'/imprint'}>Imprint</Link>
          </div>
        </Col>
      </Row>
    </Footer>
  )
};

export default LayoutFooter;
