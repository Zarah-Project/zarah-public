import React, {useState, useEffect} from "react";
import {AutoSizer, CellMeasurer, CellMeasurerCache, List} from 'react-virtualized';
import {Drawer, Typography} from 'antd';
import facetStyle from "./LongTextFacet.module.css";
const { Paragraph } = Typography;
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import EmptyFacet from "./EmptyFacet";
import style from "../../../Document/Document.module.css";
import AuthorityRecord from "../../../AuthorityRecord/AuthorityRecord";

const { Search } = Input;

const AuthorityFacet = ({facets, selectedFacets, search=false, field, onSelect, onRemove}) => {
  const [filterValue, setFilterValue] = useState('');
  const [facetOriginalData, setFacetOriginalData] = useState([]);
  const [facetData, setFacetData] = useState([]);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 25,
    minHeight: 25
  });

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

  const renderRow = ({ index, key, style, parent }) => {
    const facetText = facetData[index]['text'].substring(0, facetData[index]['text'].lastIndexOf("#"));
    const facetID = facetData[index]['text'].substring(facetData[index]['text'].lastIndexOf("#") + 1);

    if (selectedFacets.includes(facetText)) {
      return (
        <CellMeasurer
          key={key}
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div style={style}>
            <div className={facetStyle.FacetWrapper}>
              <span className={facetStyle.LongFacetActiveText}>
                {facetText}
              </span>
              <span className={facetStyle.FacetRemove}>
                <a className={facetStyle.FacetRemoveLink} onClick={() => onFacetRemoveClick(facetText)}>
                  <CloseOutlined />
                </a>
              </span>
            </div>
          </div>
        </CellMeasurer>
      )
    } else {
      return (
        <CellMeasurer
          key={key}
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div style={style}>
            <div className={facetStyle.FacetWrapper}>
              <span className={facetStyle.LongFacetText}>
                <a className={facetStyle.FacetLink} onClick={() => onSelect(facetText)}>
                  {facetText}
                </a>
              </span>
              <span className={facetStyle.FacetNumber}>
                ({facetData[index]['count']})
              </span>
            </div>
          </div>
        </CellMeasurer>
      )
    }
  };

  const onFacetRemoveClick = (value) => {
    onRemove(value)
  };

  const onSearch = (value) => {
    setFilterValue(value);
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
        <div style={{height: '300px'}}>
          <AutoSizer>
            {({ width }) => (
              <List
                width={width}
                height={300}
                deferredMeasurementCache={cache}
                rowCount={facetData.length}
                rowHeight={cache.rowHeight}
                rowRenderer={renderRow}
                overscanRowCount={3}
              />
            )}
          </AutoSizer>
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <EmptyFacet />
    )
  }
};

export default AuthorityFacet;
