import { Field } from 'formik';
import CustomSelect from './CustomSelect';

const FormikSelect = ({ id, options, name, guestRef, ...restProps }) => (
  <Field name={name}>
    {({ form, field }) => {
      const { setFieldValue } = form;
      const { value } = field;
      const getOption = (val) => options.find((opt) => opt.value === val);

      return (
        // Picker for start of range
        <CustomSelect
          id={id}
          options={options}
          {...restProps}
          value={getOption(value)}
          onInputChange={(val) => setFieldValue(name, val.value)}
          ref={guestRef}
          height="4rem" //! refactor? Set height of React-Select objects to match input styling:
        />
      );
    }}
  </Field>
);

export default FormikSelect;
