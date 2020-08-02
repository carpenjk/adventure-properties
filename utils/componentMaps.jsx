import InputBase from '../components/InputBase';
import CustomSelect from '../components/CustomSelect';
import DateRange from '../components/DateRange';

//for dynamically rendering React elements from JSON
//Add an entry for each custom component referenced in the file
export const Components = {
  DateRange: DateRange,
  CustomSelect: CustomSelect,
  InputBase: InputBase,
};
