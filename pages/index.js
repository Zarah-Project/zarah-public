import AppLayout from "../components/Layout/Layout";
import SearchBarDesktop from "../components/Search/SearchBarDesktop/SearchBarDesktop";
import React from "react";
import {Media} from "../components/Media/Media";
import style from "../styles/global.module.css"

import SearchBarMobile from "../components/Search/SearchBarMobile/SearchBarMobile";
import {useRouter} from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  const onSearch = (values) => {
    router.push({pathname: '/search', query: values})
  };

  return (
    <AppLayout>
      <Head>
        <title>ZARAH - Women’s labour activism in Eastern Europe and transnationally, from the age of empires to the late 20th century</title>
      </Head>
      <div className={style.FrontPageSearch}>
        <Media at="xs">
          <div style={{paddingTop: '200px'}}>
            <h2>ZARAH - Women’s labour activism in Eastern Europe and transnationally<br/>from the age of empires to the late 20th century</h2>
            <SearchBarMobile onSearch={onSearch}/>
          </div>
        </Media>
        <Media greaterThan="xs">
          <div style={{paddingTop: '200px'}}>
            <h1>ZARAH - Women’s labour activism in Eastern Europe and transnationally<br/>from the age of empires to the late 20th century</h1>
            <SearchBarDesktop onSearch={onSearch}/>
          </div>
        </Media>
      </div>
    </AppLayout>
  )
}
