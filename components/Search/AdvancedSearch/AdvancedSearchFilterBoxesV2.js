import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row} from 'antd';
import style from "./AdvancedSearchFilterBoxes.module.css";
import LongTextFacet from "./facets/LongTextFacet";
import Collapse from "@kunukn/react-collapse";
import DateRangeFacet from "./facets/DateRangeFacet";


const AdvancedSearchFilterBoxesV2 = ({ facets, selectedFacets, onFacetSelect, onFacetRemove,
                                       onDateRangeFacetSelect, onDateRangeFacetRemove }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeFacet, setActiveFacet] = useState('person');

  const renderTextFacet = (label, field, search=false) => {
    return (
      <Card title={label} bordered={false} style={{ width: '100%' }} className={style.FacetCard}>
        <LongTextFacet
          search={search}
          selectedFacets = {selectedFacets.hasOwnProperty(field) ? selectedFacets[field] : []}
          onSelect={(value) => {onFacetSelect(field, value)}}
          onRemove={(value) => {onFacetRemove(field, value)}}
          facets={facets.hasOwnProperty('facet_fields') ? facets['facet_fields'][`${field}_facet`] : []}
        />
      </Card>
    )
  };

  const renderDateFacet = () => {
    const getDateRangeSelectedFacets = (startField, endField) => {
      let startDate;
      let endDate;

      if (selectedFacets.hasOwnProperty(startField)) {
        startDate = selectedFacets[startField];
      }
      if (selectedFacets.hasOwnProperty(endField)) {
        endDate = selectedFacets[endField];
      }
      return [startDate, endDate]
    };

    return (
      <DateRangeFacet
        selectedFacets = {getDateRangeSelectedFacets('year_start', 'year_end')}
        onSelect={(startValue, endValue) => {
          onDateRangeFacetSelect({
            'year_start': startValue,
            'year_end': endValue
          })
        }}
        onRemove={() => onDateRangeFacetRemove('year_start', 'year_end')}
        facets={facets.hasOwnProperty('facet_fields') ? facets['facet_fields']['date_facet'] : []}
      />
    )
  };

  const getCounter = (field) => {
    return facets.hasOwnProperty('facet_fields') ? facets['facet_fields'][`${field}_facet`].length / 2 : 0
  };

  const renderBoxes = () => {
    return (
      <React.Fragment>
        <Row>
          <Col xs={4}/>
          <Col xs={14}>
            <div className={style.SearchOpenWrapper}>
              <a className={style.SearchOpenLink} onClick={() => setSearchOpen(!searchOpen)}>
                {searchOpen ? 'CLOSE ADVANCED SEARCH' : 'SHOW ADVANCED SEARCH'}
              </a>
            </div>
          </Col>
          <Col xs={6}/>
        </Row>
        <Collapse isOpen={searchOpen}>
          <Row gutter={[48]}>
            <Col xs={24} lg={12}>
              <div className={style.FilterBy}>
                <h3>Filter By</h3>
                <div className={style.SelectButtons}>
                  <Button
                    onClick={() => setActiveFacet('date')}
                    className={activeFacet === 'date' ? style.ActiveButton : ''}>
                    Date
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('person')}
                    className={activeFacet === 'person' ? style.ActiveButton : ''}>
                    People ({getCounter('person')})
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('organisation')}
                    className={activeFacet === 'organisation' ? style.ActiveButton : ''}>
                    Organizations ({getCounter('organisation')})
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('event')}
                    className={activeFacet === 'event' ? style.ActiveButton : ''}>
                    Events ({getCounter('event')})
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('place')}
                    className={activeFacet === 'place' ? style.ActiveButton : ''}>
                    Places ({getCounter('place')})
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('historical_context')}
                    className={activeFacet === 'historical_context' ? style.ActiveButton : ''}>
                    Historical context ({getCounter('historical_context')})
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('labour_conditions')}
                    className={activeFacet === 'labour_conditions' ? style.ActiveButton : ''}>
                    Labour conditions ({getCounter('labour_conditions')})
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('living_conditions')}
                    className={activeFacet === 'living_conditions' ? style.ActiveButton : ''}>
                    Living conditions ({getCounter('living_conditions')})
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('labour_relations')}
                    className={activeFacet === 'labour_relations' ? style.ActiveButton : ''}>
                    Labour relations ({getCounter('labour_relations')})
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('activist_repertoire')}
                    className={activeFacet === 'activist_repertoire' ? style.ActiveButton : ''}>
                    Activist repertoire ({getCounter('activist_repertoire')})
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('activist_repertoire_scale')}
                    className={activeFacet === 'activist_repertoire_scale' ? style.ActiveButton : ''}>
                    Scale of repertoire actions ({getCounter('activist_repertoire_scale')})
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('format_of_participation')}
                    className={activeFacet === 'format_of_participation' ? style.ActiveButton : ''}>
                    Format of participation ({getCounter('format_of_participation')})
                  </Button>
                  <Button
                    onClick={() => setActiveFacet('knowledge_production')}
                    className={activeFacet === 'knowledge_production' ? style.ActiveButton : ''}>
                    Communication and knowledge production ({getCounter('knowledge_production')})
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              {activeFacet === 'person' ? renderTextFacet('People', 'person', true) : ''}
              {activeFacet === 'organisation' ? renderTextFacet('Organizations', 'organisation', true) : ''}
              {activeFacet === 'event' ? renderTextFacet('Events', 'event', true) : ''}
              {activeFacet === 'place' ? renderTextFacet('Places', 'place', true) : ''}
              {activeFacet === 'historical_context' ? renderTextFacet('Historical context', 'historical_context') : ''}
              {activeFacet === 'labour_conditions' ? renderTextFacet('Labour conditions', 'labour_conditions') : ''}
              {activeFacet === 'living_conditions' ? renderTextFacet('Living conditions', 'living_conditions') : ''}
              {activeFacet === 'labour_relations' ? renderTextFacet('Labour relations', 'labour_relations') : ''}
              {activeFacet === 'activist_repertoire' ? renderTextFacet('Repertoire Action', 'activist_repertoire') : ''}
              {activeFacet === 'activist_repertoire_scale' ? renderTextFacet('Scale of repertoire actions', 'activist_repertoire_scale') : ''}
              {activeFacet === 'format_of_participation' ? renderTextFacet('Format of participation', 'format_of_participation') : ''}
              {activeFacet === 'knowledge_production' ? renderTextFacet('Communication and knowledge production', 'knowledge_production') : ''}
              {activeFacet === 'date' ? renderDateFacet() : ''}
            </Col>
          </Row>
        </Collapse>
      </React.Fragment>
    )
  };

  return (
    renderBoxes()
  )
};

export default AdvancedSearchFilterBoxesV2;
