export const getPropertyBr = (prop, br) => {
  //props automatically passed as first prop in breakpoint function
  if (!Array.isArray(prop)) {
    return prop;
  }
  if (br < prop.length - 1) return prop[br];
  return prop[prop.length - 1];
};

export const inverseProps = (prop) => {
  if (!Array.isArray(prop)) {
    return !prop;
  } else {
    return prop.map((item) => !item);
  }
};
