import React from "react";
import {Button, Col, Row} from "antd";
import {Form, Input} from 'formik-antd'
import { SearchOutlined } from '@ant-design/icons';
import style from "./SearchBarMobile.module.css";
import {Formik} from "formik";

const SearchBarMobile = ({onSearch, initialValues={}, ...props}) => {
  const onChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <Formik
      onSubmit={onSearch}
      enableReinitialize={true}
      initialValues={initialValues}
    >
      {(props) => (
        <Form layout="inline" onSubmit={props.handleSubmit}>
          <Row gutter={[32, 16]} style={{width: '100%'}}>
            <Col xs={2}> </Col>
            <Col xs={18}>
              <Input
                placeholder={'Search the catalog...'}
                className={style.SearchInput}
                name={'query'}
                size="large"
                style={{width: "100%"}}
                allowClear={true}
                onChange={onChange}
              />
            </Col>
            <Col xs={2}>
              <Button
                htmlType="submit"
                icon={<SearchOutlined style={{fontSize: '22px', fontWeight: 'bold'}} />}
                size={'large'}
                className={style.SearchButton}
              />
            </Col>
            <Col xs={2}> </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
};

export default SearchBarMobile;
