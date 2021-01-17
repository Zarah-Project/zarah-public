import {Skeleton, Spin} from "antd";
import React, {useEffect, useState} from "react";

const EmptyFacet = () => {
  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    delayed ?
    <div style={{marginLeft: '10px', marginTop: '10px'}}>
      <Spin>
        <Skeleton paragraph={{rows: 4, width: ['100%', '100%', '100%', '100%']}}/>
      </Spin>
    </div> : <div style={{padding: '10px', color: '#CCC', height: 310}}>
        No facets are available with the defined search criteria.
    </div>
  )
};

export default EmptyFacet;
