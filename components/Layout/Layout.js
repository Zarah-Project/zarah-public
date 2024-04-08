import React from "react";
import {Layout} from "antd";
import style from "./Layout.module.css";
import {Media} from "../Media/Media";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import LayoutFooter from "./Footer";

const {Content, Footer} = Layout;

export default function AppLayout({ withBackground = false, children }) {
  return (
    <Layout>
      <Media at="xs"><MobileMenu/></Media>
      <Media greaterThan="xs"><DesktopMenu/></Media>
      <Content
        style={withBackground ? {background: 'url(/images/zarah-women-bg.png) no-repeat center top scroll', backgroundSize: 'cover'} : undefined}
        className={style.Content}
      >
          {children}
      </Content>
      <LayoutFooter/>
    </Layout>
  )
}
