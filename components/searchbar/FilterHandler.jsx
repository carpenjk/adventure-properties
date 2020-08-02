const FilterHandler = (props) => {
  const { input } = props;
  const { set, get } = props.valueFunctions;
  const handleSelectFilterChange = (option) => {
    set({ [input.id]: Number(option.value) });
  };

  const handleCheckFilterChange = (e) => {
    const { id } = e.target;
    set(id);
  };

  const fnChangeMap = {
    CustomSelect: handleSelectFilterChange,
    Checkbox: handleCheckFilterChange,
    default: handleCheckFilterChange,
  };

  const getHandler = () => {
    if (fnChangeMap[input.type]) return fnChangeMap[input.type];
    return fnChangeMap['default'];
  };
  // const DynamicInput = input.component;
  const DynamicInput = props.component;
  return <DynamicInput onInputChange={getHandler()} {...props} />;
};

export default FilterHandler;
