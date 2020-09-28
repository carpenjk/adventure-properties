import React from 'react';
import BoxWeaver from './webweaver/BoxWeaver';
import { getComponentData, getSubComponentData } from 'dataweaver';

const SubComponents = ({ data, semKey, ...directProps }) => {
  // const test = getComponentData(semKey, data);
  const { props, items } = data[semKey];
  // const { Layout, props, items } = getComponentData(semKey, data)[semKey];
  if (!items) {
    return '';
  }

  return (
    <React.Fragment>
      {items.map((item, index) => {
        return (
          <BoxWeaver
            key={item.key}
            semKey={semKey}
            data={getSubComponentData(semKey, data, index)}
            {...directProps}
          />
        );
      })}
    </React.Fragment>
  );
};

export default SubComponents;
