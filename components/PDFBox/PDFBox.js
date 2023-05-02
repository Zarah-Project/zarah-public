import React, {useEffect, useState} from "react";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import style from "./PDFBox.module.css";

const PDFBox = ({fileURL, width='100%'}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    fileURL ?
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.js">
      <div style={{ width: width, marginBottom: '20px' }} className={style.PDFBoxWrapper}>
        <Viewer
          fileUrl={fileURL}
          defaultScale={1.2}
          plugins={[defaultLayoutPluginInstance,]}
        />
      </div>
    </Worker> : ''
  )
};

export default PDFBox;
