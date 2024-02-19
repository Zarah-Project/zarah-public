import React from "react";
import { useRouter } from 'next/router'
import useSWR from "swr";
import {API, fetcher} from "../../../utils/api";
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import AuthorityRecord from "../../../components/Document/AuthorityRecord";

const SpecialRecordsPage = () => {
    const router = useRouter();
    const { id, type } = router.query;

    const getType = () => {
        switch (type) {
            case 'person':
                return 'people'
            case 'organisation':
                return 'organisations'
            case 'event':
                return 'events'
            case 'place':
                return 'places'
        }
    }

    const { data, error } = useSWR(id ? `${API}/${getType(type)}/${id}/` : null, fetcher);

    return (
        <AppLayout withBackground={true}>
            <Head>
                <title>{data ? `ZARAH DB - ${data.title}` : 'ZARAH DB'}</title>
            </Head>
            <div className="container">
                {data ? <AuthorityRecord data={data} type={getType(type)} onFilter={() => {}} /> : ''}
            </div>
        </AppLayout>
    )
};

export default SpecialRecordsPage
