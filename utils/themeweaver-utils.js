export const getProp = (prop, br) => (props) => {
  //props automatically passed as first prop in breakpoint function
  const propValues = props[prop];
  if (!Array.isArray(propValues)) {
    return propValues;
  }
  let value = '';
  if (!br) {
    value = propValues[0];
  } else if (br < propValues.length) {
    value = propValues[br];
  } else {
    value = propValues[propValues.length - 1];
  }

  return value;
};

export const getConditionalProp = (prop, fn, br) => (props) => {
  const propValue = getProp(prop, br)(props);

  return fn({ props: props, [prop]: propValue });
};

export const inverseProps = (prop) => {
  if (!Array.isArray(prop)) {
    return !prop;
  } else {
    return prop.map((item) => !item);
  }
};

export const getComponentData = (semKey, data) => {
  const compData = data[semKey];
  //set optional properties to '' for destructuring;
  compData.Layout = compData.Layout ? compData.Layout : '';
  return { [semKey]: compData };
};

export const getSubComponentData = (semKey, data, i) => {
  const compData = getComponentData(semKey, data);
  if (!compData[semKey].items) return undefined;
  const subCompData = compData[semKey].items[i];
  return { [semKey]: subCompData };
};

export const getSubComponentProps = (semKey, data) => {
  return { semKey: semKey, data: getComponentData(semKey, data) };
};
