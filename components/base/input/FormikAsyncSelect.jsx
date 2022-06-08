import { FastField } from 'formik';
import CustomAsyncSelect from './CustomAsyncSelect';

const FormikAsyncSelect = (props) => {
  // const [field, meta, { setValue }] = useField(props);
  // const { value } = field;
  const { name, ...remProps } = props;

  return (
    <FastField name={name}>
      {({ field, form }) => {
        const { setFieldValue } = form;
        const { value } = field;
        return (
          <CustomAsyncSelect
            {...remProps}
            onChange={(val) => setFieldValue(name, val)}
            value={value}
          />
        );
      }}
    </FastField>
  );
};

export default FormikAsyncSelect;
