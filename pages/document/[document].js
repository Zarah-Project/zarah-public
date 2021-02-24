import React from "react";
import { useRouter } from 'next/router'
import useSWR from "swr";
import {API, fetcher} from "../../utils/api";
import AppLayout from "../../components/Layout/Layout";
import Document from "../../components/Document/Document";
import Head from "next/head";

const RecordPage = () => {
  const router = useRouter();
  const { document } = router.query;

  const { data, error } = useSWR(document ? `${API}/document/${document}/` : null, fetcher);

  const renderMeta = (data) => {
    const zoteroField = (field) => {
      if (data.hasOwnProperty('zotero_data')) {
        const zoteroObject = data['zotero_data'] !== "" ? JSON.parse(data['zotero_data']) : {};
        if (zoteroObject.hasOwnProperty(field)) {
          return zoteroObject[field]
        } else {
          return ''
        }
      }
    };

    if (data) {
      return (
        <React.Fragment>
          <meta name={'citation_title'} content={data.title}/>
          <meta name={'citation_date'} content={zoteroField('date')}/>
          <meta name={'citation_journal_title'} content={zoteroField('pulicationTitle')}/>
          <meta name={'citation_book_title'} content={zoteroField('bookTitle')}/>
          <meta name={'citation_volume'} content={zoteroField('volume')}/>
          <meta name={'citation_issue'} content={zoteroField('issue')}/>
          <meta name={'citation_publisher'} content={zoteroField('publisher')}/>
          <meta name={'citation_isbn'} content={zoteroField('isbn')}/>
          <meta name={'citation_abstract'} content={data.abstract}/>
          <meta name={'citation_public_url'} content={`${process.env.NEXT_PUBLIC_BASE_PATH}${router.asPath}`}/>
        </React.Fragment>
      )
    }
  };

  return (
    <AppLayout withBackground={true}>
      <Head>
        <title>{data ? `ZARAH DB - ${data.title}` : 'ZARAH'}</title>
        {renderMeta(data)}
      </Head>
      <div className="container">
        {data ? <Document data={data}/> : ''}
      </div>
    </AppLayout>
  )
};

export default RecordPage
