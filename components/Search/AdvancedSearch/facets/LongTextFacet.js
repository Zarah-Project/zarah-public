import React, {useState, useEffect} from "react";
import { VariableSizeList as List } from 'react-window';
import { Typography } from 'antd';
import facetStyle from "./TextFacet.module.css";
const { Paragraph } = Typography;
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import EmptyFacet from "./EmptyFacet";

const { Search } = Input;

const TextFacet = ({facets, selectedFacets, search=false, onSelect, onRemove}) => {
  const [filterValue, setFilterValue] = useState('');
  const [facetOriginalData, setFacetOriginalData] = useState([]);
  const [facetData, setFacetData] = useState([]);

  useEffect(() => {
    facetInit();
  }, [facets]);

  useEffect(() => {
    if (filterValue === '') {
      facetInit();
    }

    if (filterValue.length > 2) {
      const matches = facetOriginalData.filter(f => f['text'].toLowerCase().includes(filterValue.toLowerCase()));
      setFacetData(matches);
    }
  }, [filterValue]);

  const facetInit = () => {
    const fData = [];
    facets.forEach((facet, index) => {
      if (index % 2 === 0) {
        fData.push({text: facet, count: facets[index+1]})
      }
    });
    setFacetOriginalData(fData);
    setFacetData(fData);
  };

  const Row = ({ index, style }) => {
    if (selectedFacets.includes(facetData[index]['text'])) {
      return (
        <div style={style}>
          <div className={facetStyle.FacetWrapper}>
            <Paragraph className={facetStyle.LongFacetActiveText}>
              {facetData[index]['text']}
            </Paragraph>
            <Paragraph className={facetStyle.FacetRemove}>
              <a className={facetStyle.FacetRemoveLink} onClick={() => onFacetRemoveClick(facetData[index]['text'])}>
                <CloseOutlined />
              </a>
            </Paragraph>
          </div>
        </div>
      )
    } else {
      return (
        <div style={style}>
          <div className={facetStyle.FacetWrapper}>
            <Paragraph className={facetStyle.LongFacetText}>
              <a className={facetStyle.FacetLink} onClick={() => onFacetClick(facetData[index]['text'])}>
                {facetData[index]['text']}
              </a>
            </Paragraph>
            <Paragraph className={facetStyle.FacetNumber}>
              ({facetData[index]['count']})
            </Paragraph>
          </div>
        </div>
      )
    }
  };

  const onFacetClick = (value) => {
    onSelect(value)
  };

  const onFacetRemoveClick = (value) => {
    onRemove(value)
  };

  const onSearch = (value) => {
    setFilterValue(value);
  };

  const getItemSize = index => {
    return (Math.floor(facetData[index]['text'].length / 78) + 1) * 25;
  };

  if (facets.length > 0) {
    return(
      <React.Fragment>
        {search &&
          <div className={facetStyle.Search}>
            <Search
              placeholder="Search..."
              onSearch={onSearch}
              style={{ width: '100%' }}
              allowClear={true}
              enterButton
            />
          </div>
        }
        <List
          height={300}
          itemCount={facetData.length}
          itemSize={getItemSize}
          width={'95%'}
          style={{marginLeft: '10px', marginTop: '10px'}}
        >
          {Row}
        </List>
      </React.Fragment>
    )
  } else {
    return (
      <EmptyFacet />
    )
  }
};

export default TextFacet;
