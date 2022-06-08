import { FastField } from 'formik';
import Checkbox from './Checkbox';

const FormikCheckbox = (props) => {
  const { name, value: checkVal } = props;

  return (
    <FastField name={name}>
      {({ field, form }) => {
        const { setFieldValue } = form;
        const { value } = field;

        const handleChange = () => {
          const i = value.indexOf(checkVal);
          if (i === -1) {
            setFieldValue(name, [...value, checkVal]);
          } else {
            setFieldValue(name, [...value.slice(0, i), ...value.slice(i + 1)]);
          }
        };
        return (
          <Checkbox
            {...field}
            {...props}
            type="checkbox"
            value={checkVal}
            onChange={handleChange}
            checked={value ? value.includes(checkVal) : false}
          />
        );
      }}
    </FastField>
  );
};

export default FormikCheckbox;
