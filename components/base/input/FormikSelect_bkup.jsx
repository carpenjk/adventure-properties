import { Field } from 'formik';
import CustomSelect from './CustomSelect';

const FormikSelect = ({ id, options, name, guestRef, ...restProps }) => (
  <Field name={name}>
    {({ form, field }) => {
      const { setFieldValue } = form;
      const { value } = field;
      const getOption = (val) => {
        // debugger;
        if (!val) return '';
        return options.find((opt) => opt.value === val);
      };
      // debugger;
      return (
        // Picker for start of range
        <CustomSelect
          id={id}
          name={name}
          options={options}
          {...restProps}
          value={getOption(value)}
          onChange={(val) => setFieldValue(field.name, val.value)}
        />
      );
    }}
  </Field>
);

export default FormikSelect;
