import {Col, Pagination, Row} from "antd";
import React from "react";
import style from "./ResultPagination.module.css";

const ResultPagination = ({count, limit=10, offset=0, onPageChange}) => {
  return (
    <Row>
      <Col xs={24} md={24}>
        <div className={style.Pagination}>
          <Pagination
            total={count}
            pageSize={limit ? limit : 10}
            showSizeChanger={true}
            current={offset ? offset / limit + 1 : 1}
            onChange={onPageChange} />
        </div>
      </Col>
    </Row>
  )
};

export default ResultPagination;
