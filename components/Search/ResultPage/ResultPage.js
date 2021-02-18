import React from "react";
import style from "./ResultPage.module.css"
import ResultPageList from "./ResultPageList";
import ResultPagination from "./ResultPagination";

const ResultPage = ({data, query, limit, view='list', offset, selectedFacets, onPageChange, onMarkerClick}) => {
  return (
    <div className={style.Results}>
      <ResultPagination count={data.count} limit={limit} offset={offset} onPageChange={onPageChange} />
      <ResultPageList data={data.results} highlights={data.highlights}  />
      <ResultPagination count={data.count} limit={limit} offset={offset} onPageChange={onPageChange} />
    </div>
  );
};

export default ResultPage;
