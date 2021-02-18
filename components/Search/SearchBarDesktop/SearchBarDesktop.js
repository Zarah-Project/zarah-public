import React, {useState, useEffect} from "react";
import {Button, Col, Row} from "antd";
import { Form, Input } from 'formik-antd'
import { SearchOutlined } from '@ant-design/icons';
import style from "./SearchBarDesktop.module.css";
import {Formik} from "formik";
import AdvancedSearch from "../AdvancedSearch/AdvancedSearch";
import AdvancedSearchFilterBoxes from "../AdvancedSearch/AdvancedSearchFilterBoxes";
import SelectedFacets from "../SelectedFacets/SelectedFacets";

const SearchBarDesktop = ({onSearch, query, facets, selectedFacets, advancedSearch=false,
                            onFacetSelect, onFacetRemove, ...props}) => {
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
                  onChange={(e) => {setQueryString({query: e.target.value})}}
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
        />
      </Row>
      {advancedSearch &&
      <AdvancedSearchFilterBoxes
        onFacetSelect={onFacetSelect}
        onFacetRemove={onFacetRemove}
        selectedFacets={selectedFacets}
        facets={facets}
      />
      }
    </React.Fragment>
  )
};

export default SearchBarDesktop;
