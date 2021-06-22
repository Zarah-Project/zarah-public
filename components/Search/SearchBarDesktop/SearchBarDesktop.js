import React, {useState, useEffect} from "react";
import {Button, Col, Row} from "antd";
import { Form, Input } from 'formik-antd'
import { SearchOutlined } from '@ant-design/icons';
import style from "./SearchBarDesktop.module.css";
import {Formik} from "formik";
import SelectedFacets from "../SelectedFacets/SelectedFacets";
import AdvancedSearchFilterBoxes from "../AdvancedSearch/AdvancedSearchFilterBoxes";

const SearchBarDesktop = ({onSearch, query, facets={}, selectedFacets={}, advancedSearch=1, onFacetSelect, onFacetRemove, onDateRangeFacetSelect, onDateRangeFacetRemove, ...props}) => {
  const [queryString, setQueryString] = useState({query: ''});

  useEffect(() => {
    setQueryString({query: query});
  }, [query]);

  return (
    <React.Fragment>
      <Formik
        onSubmit={onSearch}
        enableReinitialize={true}
        initialValues={queryString}
      >
        {({values, submitForm, ...props}) => (
          <Form layout="inline" onSubmit={props.handleSubmit}>
            <Row gutter={[32, 16]} style={{width: '100%'}}>
              <Col xs={0} sm={4}/>
              <Col xs={20} sm={14}>
                <Input
                  placeholder={'Search the catalog...'}
                  className={style.SearchInput}
                  name={'query'}
                  size="large"
                  style={{width: "100%"}}
                  allowClear={true}
                  onChange={(e) => {
                    setQueryString({query: e.target.value})
                    if (e.target.value === '') {
                      submitForm()
                    }
                  }}
                />
              </Col>
              <Col xs={4} sm={2} style={{textAlign: 'right'}}>
                <Button
                  onClick={submitForm}
                  icon={<SearchOutlined style={{fontSize: '22px', fontWeight: 'bold'}} />}
                  size={'large'}
                  className={style.SearchButton}
                />
              </Col>
              <Col xs={0} sm={4}/>
            </Row>
          </Form>
        )}
      </Formik>
      <Row>
        <SelectedFacets
          selectedFacets={selectedFacets}
          onFacetRemove={onFacetRemove}
          onDateRangeFacetRemove={onDateRangeFacetRemove}
        />
      </Row>
      {
        advancedSearch > 0 &&
        <AdvancedSearchFilterBoxes
          onFacetSelect={onFacetSelect}
          onFacetRemove={onFacetRemove}
          onDateRangeFacetSelect={onDateRangeFacetSelect}
          onDateRangeFacetRemove={onDateRangeFacetRemove}
          selectedFacets={selectedFacets}
          facets={facets}
        />
      }
    </React.Fragment>
  )
};

export default SearchBarDesktop;
