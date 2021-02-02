import {Col, Layout, Menu, Row} from "antd";
import style from "./DesktopMenu.module.css";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const {Header} = Layout;

const DesktopMenu = () => {
  return (
    <Header className={style.Header}>
      <Row align="middle">
        <Col flex={2}>
          <div className={style.Logo}>
            <a href={'/'}>
              <Image width={128} height={40} src='/images/zarah-logo.png'/>
            </a>
          </div>
        </Col>
        <Col flex={22}>
          <Menu theme="light" mode="horizontal" className={style.Menu}>
            <Menu.Item className={style.MenuItem} key="search">
              <Link href={'/search'}>DATABASE</Link>
            </Menu.Item>
            <Menu.Item className={style.MenuItem} key="timeline">
              <Link href={'/researchers'}>FOR RESEARCHERS</Link>
            </Menu.Item>
            <Menu.Item className={style.MenuItem} key="collections">
              <Link href={'/data'}>DATA</Link>
            </Menu.Item>
            <Menu.Item className={style.MenuItem} key="about">
              <Link href={'/about'}>ABOUT</Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  )
};

export default DesktopMenu;
