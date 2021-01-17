import React from "react";
import "../styles/antd.less";
import { MediaContextProvider } from "../components/Media/Media"
import useRouterScroll from "../utils/useRouterScroll";


function MyApp({ Component, pageProps }) {
  return (
    <MediaContextProvider>
      {useRouterScroll()}
      <Component {...pageProps} />
    </MediaContextProvider>
  )
}

export default MyApp
