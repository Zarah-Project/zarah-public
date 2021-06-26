import AppLayout from "../components/Layout/Layout";
import SearchBarDesktop from "../components/Search/SearchBarDesktop/SearchBarDesktop";
import React, {useState} from "react";
import {Media} from "../components/Media/Media";
import useSWR from 'swr'
import {useRouter} from "next/router";
import {API, fetcher} from "../utils/api";
import {Col, Row} from "antd";
import ResultPage from "../components/Search/ResultPage/ResultPage";
import Image from "next/image";
import Head from "next/head";

const Search = () => {
  const router = useRouter();
  const params = router.query;
  const {query, limit, offset, view, ...selectedFacets} = params;

  const { data, error } = useSWR([`${API}/search`, params], fetcher);

  const onSearch = (values) => {
    router.push({pathname: '/search', query: values})
  };

  const onPageChange = (page, pageSize) => {
    router.push({
      pathname: '/search',
      query: {
        query: query,
        limit: pageSize,
        offset: (page * pageSize) - pageSize,
        ...selectedFacets
      }
    })
  };

  const onFacetSelect = (field, value) => {
    if (selectedFacets.hasOwnProperty(field)) {
      if (Array.isArray(selectedFacets[field])) {
        if (!selectedFacets[field].includes(value)) {
          selectedFacets[field].push(value)
        }
      } else {
        if (!selectedFacets[field].includes(value)) {
          selectedFacets[field] = [selectedFacets[field], value]
        }
      }
    } else {
      selectedFacets[field] = value;
    }

    router.push({
      pathname: '/search', query: {
        query: query,
        limit: limit,
        ...selectedFacets
      }
    })
  };

  const onFacetRemove = (field, value) => {
    if (selectedFacets.hasOwnProperty(field)) {
      if (Array.isArray(selectedFacets[field])) {
        if (selectedFacets[field].includes(value)) {
          selectedFacets[field] = selectedFacets[field].filter(facet => facet !== value);
        }
      } else {
        if (selectedFacets[field] === value) {
          delete selectedFacets[field]
        }
      }
    }

    router.push({
      pathname: '/search', query: {
        query: query,
        limit: limit,
        ...selectedFacets
      }
    })
  };

  const onDateRangeFacetSelect = (dateRangeValues) => {
    const newFacets = {...selectedFacets, ...dateRangeValues}
    router.push({
      pathname: '/search', query: {
        query: query,
        limit: limit,
        ...newFacets
      }
    })
  };

  const onDateRangeFacetRemove = (dateStartField, dateEndField) => {
    delete selectedFacets[dateStartField];
    delete selectedFacets[dateEndField];
    router.push({
      pathname: '/search', query: {
        query: query,
        limit: limit,
        ...selectedFacets
      }
    })
  };

  const renderResults = () => (
    data.count > 0 ?
    <React.Fragment>
      <ResultPage
        query={query}
        data={data}
        limit={limit}
        offset={offset}
        view={view}
        selectedFacets={selectedFacets}
        onPageChange={onPageChange}
      />
    </React.Fragment> :
    <Row>
      <Col xs={24}>
        <div style={{textAlign: 'center', marginTop: '20px', fontWeight: '700', color: '#CCC'}}>
          There are no records with the defined search criteria!<br/>
          Please try again with a different search term.
        </div>
      </Col>
      <Col xs={24}>
        <div style={{textAlign: 'center', marginTop: '20px', opacity: 0.3}}>
          <Image
            width={300}
            height={94}
            objectFit={'contain'}
            objectPosition={'center center'}
            src={'/images/zarah-empty.png'}
          />
        </div>
      </Col>
    </Row>
  );

  return (
    <AppLayout withBackground={true}>
      <Head>
        <title>ZARAH DB - Search</title>
      </Head>
      <div className="container">
        <Media at="xs">
          <SearchBarDesktop
            onSearch={onSearch}
            query={query}
            selectedFacets={selectedFacets}
            advancedSearch={2}
            facets={data ? data['facets'] : {}}
          />
        </Media>
        <Media greaterThan="xs">
          <div style={{marginTop: '100px'}}>
            <SearchBarDesktop
              onSearch={onSearch}
              query={query}
              selectedFacets={selectedFacets}
              advancedSearch={2}
              facets={data ? data['facets'] : {}}
              onFacetSelect={onFacetSelect}
              onFacetRemove={onFacetRemove}
              onDateRangeFacetSelect={onDateRangeFacetSelect}
              onDateRangeFacetRemove={onDateRangeFacetRemove}
            />
          </div>
        </Media>
      </div>
      <Row>
        <Col xs={0} sm={3}/>
        <Col xs={24} sm={18} style={{minHeight: '800px'}}>
          { data ? renderResults() : <div>Loading...</div>}
        </Col>
        <Col xs={0} sm={3}/>
      </Row>
    </AppLayout>
  );
};

export default Search;
