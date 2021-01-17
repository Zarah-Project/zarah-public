import {Col, Row} from "antd";
import {Select} from "formik-antd";
import React, {useState} from "react";
import {AUTHORITY_RECORDS_OPTIONS} from "../selectConfigs";

const AuthoritySearch = ({facets, ...props}) => {
  const [options, setOptions] = useState([]);

  const updateFacetSelection = (value) => {
    initValueSelection(value)
  };

  const initValueSelection = (record_type) => {
    const {facet_fields} = facets;
    if (facet_fields.hasOwnProperty(`${record_type}_facet`)) {
      const f = facet_fields[`${record_type}_facet`];
      const fData = [];
      f.forEach((facet, index) => {
        if (index % 2 === 0) {
          fData.push({value: facet, label: `${facet} (${f[index+1]})`})
        }
      });
      setOptions(fData);
    }
  };

  return (
    <Row gutter={[16]}>
      <Col xs={8}>
        <Select
          name={'authority_record_type'}
          style={{width: '100%'}}
          placeholder={'Authority Record Type'}
          options={AUTHORITY_RECORDS_OPTIONS}
          onSelect={updateFacetSelection}
        />
      </Col>
      <Col xs={16}>
        <Select
          name={'authority_record_value'}
          style={{width: '100%'}}
          showSearch={true}
          allowClear={true}
          placeholder={`Authority Values`}
          options={options}
        />
      </Col>
    </Row>
  )
};

export default AuthoritySearch;
