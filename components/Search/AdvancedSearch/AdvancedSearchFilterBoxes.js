import React, {useEffect, useState} from 'react';
import {Card, Col, Row} from 'antd';
import style from "./AdvancedSearchFilterBoxes.module.css";
import TextFacet from "./facets/TextFacet";
import { Tabs } from 'antd';
import Collapse from "@kunukn/react-collapse";

const { TabPane } = Tabs;

const AdvancedSearchFilterBoxes = ({ facets, selectedFacets, onFacetSelect, onFacetRemove }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const renderTextFacet = (label, field, search=false) => {
    return (
      <Card title={label} bordered={false} style={{ width: '100%' }}>
        <TextFacet
          search={search}
          selectedFacets = {selectedFacets.hasOwnProperty(field) ? selectedFacets[field] : []}
          onSelect={(value) => {onFacetSelect(field, value)}}
          onRemove={(value) => {onFacetRemove(field, value)}}
          facets={facets.hasOwnProperty('facet_fields') ? facets['facet_fields'][`${field}_facet`] : []}
        />
      </Card>
    )
  };

  const renderBoxes = () => {
    return (
      <React.Fragment>
        <Row>
          <Col xs={4}/>
          <Col xs={14}>
            <div className={style.SearchOpenWrapper}>
              <a className={style.SearchOpenLink} onClick={() => setSearchOpen(!searchOpen)}>
                {searchOpen ? 'Close Advanced Search' : 'Show Advanced Search'}
              </a>
            </div>
          </Col>
          <Col xs={6}/>
        </Row>
        <Collapse isOpen={searchOpen}>
          <div className={style.FacetsWrapper}>
            <Tabs animated={true} defaultActiveKey="authority" >
              <TabPane tab="Authority Filters" key="authority">
                <Row gutter={[16, 32]}>
                  <Col sm={12} md={6}>
                    {renderTextFacet('People', 'person', true)}
                  </Col>
                  <Col sm={12} md={6}>
                    {renderTextFacet('Organisations', 'organisation', true)}
                  </Col>
                  <Col sm={12} md={6}>
                    {renderTextFacet('Events', 'event', true)}
                  </Col>
                  <Col sm={12} md={6}>
                    {renderTextFacet('Places', 'place', true)}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Classficiation Filters #1" key="classifications_1">
                <Row gutter={[16, 32]}>
                  <Col sm={12} md={6}>
                    {renderTextFacet('Historical context', 'historical_context')}
                  </Col>
                  <Col sm={12} md={6}>
                    {renderTextFacet('Labour conditions', 'labour_conditions')}
                  </Col>
                  <Col sm={12} md={6}>
                    {renderTextFacet('Living conditions', 'living_conditions')}
                  </Col>
                  <Col sm={12} md={6}>
                    {renderTextFacet('Labour relations', 'labour_relations')}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Classficiation Filters #2" key="classifications_2">
                <Row gutter={[16, 32]}>
                  <Col sm={12} md={6}>
                    {renderTextFacet('Repertoire Action', 'activist_repertoire')}
                  </Col>
                  <Col sm={12} md={6}>
                    {renderTextFacet('Scale of repertoire actions', 'activist_repertoire_scale')}
                  </Col>
                  <Col sm={12} md={6}>
                    {renderTextFacet('Format of participation', 'format_of_participation')}
                  </Col>
                  <Col sm={12} md={6}>
                    {renderTextFacet('Communication and knowledge production', 'knowledge_production')}
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Collapse>
      </React.Fragment>
    )
  };

  return (
    renderBoxes()
  )
};

export default AdvancedSearchFilterBoxes;
