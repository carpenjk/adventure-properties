import React from 'react';
import { getComponentData } from '../../utils/themeweaver-utils';

const BoxWeaver = ({ data, semKey, ...directProps }) => {
  const compData = getComponentData(semKey, data);
  const { Component, Layout, props, items } = compData[semKey];

  return <Component semKey={semKey} data={compData} {...directProps} />;
};

export default BoxWeaver;
