import React, {useEffect, useState} from "react";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFBox = ({fileURL, height, width='100%'}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    fileURL ?
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.2.146/build/pdf.worker.js">
      <div style={{ height: height, width: width, marginBottom: '20px' }}>
        <Viewer
          fileUrl={fileURL}
          plugins={[defaultLayoutPluginInstance,]}
        />
      </div>
    </Worker> : ''
  )
};

export default PDFBox;
