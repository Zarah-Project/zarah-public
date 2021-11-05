import React from "react";
import { MediaContextProvider } from "../components/Media/Media"
import useRouterScroll from "../utils/useRouterScroll";

require('../styles/antd.less');

function MyApp({ Component, pageProps }) {
  return (
    <MediaContextProvider>
      {useRouterScroll()}
      <Component {...pageProps} />
    </MediaContextProvider>
  )
}

export default MyApp
