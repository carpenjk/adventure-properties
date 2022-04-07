import { useField } from 'formik';
import CustomAsyncSelect from './CustomAsyncSelect';

const FormikAsyncSelect = (props) => {
  const [field, meta, { setValue }] = useField(props);
  const { value } = field;

  return (
    // Picker for start of range
    <CustomAsyncSelect
      {...props}
      onChange={(val) => setValue(val)}
      value={value}
    />
  );
};

export default FormikAsyncSelect;
