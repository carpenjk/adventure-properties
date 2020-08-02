import InputBase from '../InputBase';
import CustomSelect from '../CustomSelect';
import DateRange from '../DateRange';

//for dynamically rendering React elements from JSON
//Add an entry for each custom component referenced in the file
const Components = {
  DateRange: DateRange,
  CustomSelect: CustomSelect,
  InputBase: InputBase,
};

const MenuInputHandler = (props) => {
  const { inputRef, ...fwdProps } = props;
  const { valueFunctions, input } = fwdProps;
  const { set } = valueFunctions;
  const InputType = input.type;

  const handleSelectChange = (option) => {
    set({ [input.id]: Number(option.value) });
  };

  const handleDateChange = (date, id) => {
    set({ [id]: date });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id) set({ [id]: value });
    e.stopPropagation();
  };

  const fnChangeMap = {
    CustomSelect: handleSelectChange,
    DateRange: handleDateChange,
    default: handleInputChange,
  };

  const getHandler = () => {
    if (fnChangeMap[InputType]) return fnChangeMap[InputType];
    return fnChangeMap['default'];
  };

  const DynamicInput = Components[input.type];
  return (
    <DynamicInput ref={inputRef} onInputChange={getHandler()} {...fwdProps} />
  );
};

export default MenuInputHandler;
