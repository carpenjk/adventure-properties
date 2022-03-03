import { useField } from 'formik';
import CustomSelect from './CustomSelect';

const FormikSelect = (props) => {
  const { options } = props;
  const [field, meta, { setValue }] = useField(props);
  const { value } = field;
  const getOption = (val) => {
    if (!val) return '';
    return options.find((opt) => opt.value === val);
  };
  return (
    // Picker for start of range
    <CustomSelect
      {...props}
      value={getOption(value) || ''}
      onChange={(val) => setValue(val.value)}
    />
  );
};

export default FormikSelect;
