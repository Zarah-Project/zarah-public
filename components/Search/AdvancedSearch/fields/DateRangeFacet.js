import {Button, Col, Row, Slider} from "antd";
import React, {useEffect, useState} from "react";
import style from "./DateRangeFacet.module.css"
import { CheckOutlined, UndoOutlined } from '@ant-design/icons';

const DateRangeFacet = ({facets=[1905, 1, 1988, 1], selectedFacets=[], onSelect, onRemove}) => {
  const [min, setMin] = useState(1990);
  const [max, setMax] = useState(2000);
  const [sliderValue, setSliderValue] = useState([1990, 2000]);

  useEffect(() => {
    facetInit();
  }, []);

  const facetInit = () => {
    if (facets.length > 0) {
      const fData = [];
      facets.forEach((facet, index) => {
        if (index % 2 === 0) {
          fData.push({text: facet, count: facets[index+1]})
        }
      });

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
      <div>
        <Slider
          range={true}
          min={min}
          max={max}
          value={sliderValue}
          tooltipVisible={false}
          className={style.Slider}
          onChange={onChange}
        />
        <Row>
          <Col xs={24} style={{textAlign: 'center'}}>
            <span className={style.SliderValues}>{sliderValue[0]} - {sliderValue[1]}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={24} style={{textAlign: 'right', marginTop: '20px'}}>
            <Button type="primary" size="small" className={style.FilterButton} onClick={onFilter}>
              Filter <CheckOutlined />
            </Button>
            <Button size="small" className={style.ResetButton} onClick={onRemove}>
              Reset <UndoOutlined />
            </Button>
          </Col>
        </Row>
      </div>
    )
  } else {
    return (
      ''
    )
  }

};

export default DateRangeFacet;
