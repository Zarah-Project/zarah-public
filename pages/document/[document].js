import React from "react";
import { useRouter } from 'next/router'
import useSWR from "swr";
import {API, fetcher} from "../../utils/api";
import AppLayout from "../../components/Layout/Layout";
import Document from "../../components/Document/Document";

const RecordPage = () => {
  const router = useRouter();
  const { document } = router.query;

  const { data, error } = useSWR(document ? `${API}/document/${document}/` : null, fetcher);

  return (
    <AppLayout withBackground={true}>
      <div className="container">
        {data ? <Document data={data}/> : ''}
      </div>
    </AppLayout>
  )
};

export default RecordPage
