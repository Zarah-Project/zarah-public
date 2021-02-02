import React, {useState, useEffect} from "react";
import {Button, Col, Row} from "antd";
import style from "./AdvancedSearch.module.css";
import Collapse from "@kunukn/react-collapse";
import {Form, Select} from "formik-antd";
import {Formik} from "formik";
import {QUERY_FIELD_OPTIONS} from "./selectConfigs";
import AuthoritySearch from "./fields/AuthoritySearch";

const AdvancedSearch = ({onAdvancedSearch, searchValue, facets, selectedFacets={}}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (Object.keys(selectedFacets).length > 0) {
      setSearchOpen(true);
    } else {
      setSearchOpen(false);
    }

    /* Query Fields init */
    if (selectedFacets.hasOwnProperty('query_fields')) {
      if (!Array.isArray(selectedFacets['query_fields'])) {
        selectedFacets['query_fields'] = [selectedFacets['query_fields']]
      }
    }
    setInitialValues(selectedFacets);
  }, [selectedFacets]);

  const onSearch = (values) => {
    values['query'] = searchValue;
    onAdvancedSearch(values)
  };

  return (
    <React.Fragment>
      <Row>
        <Col xs={4}/>
        <Col xs={14}>
          <div className={style.SearchOpenWrapper}>
            <a className={style.SearchOpenLink} onClick={() => setSearchOpen(!searchOpen)}>
              {searchOpen ? 'CLOSE ADVANCED SEARCH' : 'OPEN ADVANCED SEARCH'}
            </a>
          </div>
        </Col>
        <Col xs={6}/>
      </Row>
      <Collapse isOpen={searchOpen}>
        <div className={style.AdvancedSearchWrapper}>
          <Row>
            <Col xs={4}/>
            <Col xs={14}>
              <Formik
                onSubmit={onSearch}
                enableReinitialize={true}
                initialValues={initialValues}
              >
                {({submitForm, setFieldValue, ...props}) => (
                  <Form layout="inline" onSubmit={props.handleSubmit}>
                    <Row gutter={[32, 16]} style={{width: '100%'}}>
                      <Col xs={24}>
                        <label
                          htmlFor={'query_fields'}>{`Search ${searchValue === '' ? '' : `'${searchValue}'`} in:`}
                        </label>
                        <Select
                          style={{width: '100%'}}
                          mode={'multiple'}
                          name={'query_fields'}
                          placeholder={'Everywhere'}
                          options={QUERY_FIELD_OPTIONS}
                          disabled={searchValue === ''}
                        />
                      </Col>
                      <Col xs={24}>
                        <label>Authority Values</label>
                        <AuthoritySearch facets={facets} />
                      </Col>
                      <Col xs={24}>
                        <div style={{textAlign: 'right'}}>
                          <Button type={'primary'} onClick={submitForm}>
                            Advanced Search
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Col>
            <Col xs={6}/>
          </Row>
        </div>
      </Collapse>
    </React.Fragment>
  )
};

export default AdvancedSearch;
