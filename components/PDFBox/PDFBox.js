import React from "react";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import style from "./PDFBox.module.css";

const PDFBox = ({fileURL, width='100%'}) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const transform = (slot) => ({
    ...slot,
    // These slots will be empty
    SwitchTheme: () => <></>,
    Open: () => <></>,
    Download: () => <></>
  });

  return (
    fileURL ?
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.js">
      <div style={{ width: width, marginBottom: '20px' }} className={style.PDFBoxWrapper}>
        <div
          className="rpv-core__viewer"
          style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              backgroundColor: '#eeeeee',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              display: 'flex',
              padding: '4px',
            }}
          >
            <Toolbar >{renderDefaultToolbar(transform)}</Toolbar>
          </div>
          <div
            style={{
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <Viewer
              fileUrl={fileURL}
              defaultScale={1.2}
              plugins={[toolbarPluginInstance]}
            />
          </div>
        </div>
      </div>
    </Worker> : ''
  )
};

export default PDFBox;
