import {Button, Card, Col, Row, Slider} from "antd";
import React, {useEffect, useState} from "react";
import style from "./DateRangeFacet.module.css"
import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import EmptyFacet from "./EmptyFacet";
import DateRangeFacetBarChart from "./DateRangeFacetBarChart";

const DateRangeFacet = ({facets, selectedFacets, onSelect, onRemove}) => {
  const [min, setMin] = useState(1990);
  const [max, setMax] = useState(2000);
  const [facetData, setFacetData] = useState([]);
  const [sliderValue, setSliderValue] = useState([1990, 2000]);

  useEffect(() => {
    facetInit();
  }, [facets, selectedFacets]);

  const facetInit = () => {
    if (facets.length > 0) {
      const fData = [];
      facets.forEach((facet, index) => {
        if (index % 2 === 0) {
          fData.push({text: facet, count: facets[index+1]})
        }
      });
      setFacetData(fData);

      const minNode = fData.reduce((prev, curr) => prev.text < curr.text ? prev : curr);
      const maxNode = fData.reduce((prev, curr) => prev.text > curr.text ? prev : curr);

      setMin(parseInt(minNode['text']));
      setMax(parseInt(maxNode['text']));

      setSliderValue([
        selectedFacets[0] ? parseInt(selectedFacets[0]) : parseInt(minNode['text']),
        selectedFacets[1] ? parseInt(selectedFacets[1]) : parseInt(maxNode['text'])
      ])
    }
  };

  const onFilter = () => {
    onSelect(sliderValue[0], sliderValue[1])
  };

  const onChange = (value) => {
    setSliderValue(value)
  };

  if (facets.length > 0) {
    return (
      <Card
        title={'Date'}
        bordered={false}
        style={{ width: '100%' }}
        className={style.FacetCard}
        extra={
          <React.Fragment>
            <Button type="primary" size="small" className={style.FilterButton} onClick={onFilter}>
              Filter <CheckOutlined />
            </Button>
            <Button size="small" className={style.ResetButton} onClick={onRemove}>
            Reset <UndoOutlined />
            </Button>
          </React.Fragment>
        }
      >
        <div className={style.SliderWrapper}>
          <DateRangeFacetBarChart data={facetData} highlight={sliderValue}/>
          <Slider
            range={true}
            min={min}
            max={max}
            value={sliderValue}
            tooltipVisible={false}
            className={style.Slider}
            onChange={onChange}
          />
        </div>
        <Row>
          <Col xs={24} style={{textAlign: 'center'}}>
            <span className={style.SliderValues}>{sliderValue[0]} - {sliderValue[1]}</span>
          </Col>
        </Row>
      </Card>
    )
  } else {
    return (
      <EmptyFacet/>
    )
  }

};

export default DateRangeFacet;
