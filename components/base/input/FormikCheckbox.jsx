import { useField } from 'formik';
import Checkbox from './Checkbox';

const FormikCheckbox = (props) => {
  const { value: checkVal, ...remProps } = props;
  const [field, meta, { setValue }] = useField({
    ...remProps,
    type: 'checkbox',
  });
  const { value } = field;

  const handleChange = () => {
    const i = value.indexOf(checkVal);
    if (i === -1) {
      setValue([...value, checkVal]);
    } else {
      setValue([...value.slice(0, i), ...value.slice(i + 1)]);
    }
  };

  return (
    <Checkbox
      {...props}
      value={checkVal}
      onChange={handleChange}
      checked={value.includes(checkVal)}
    />
  );
};

export default FormikCheckbox;
