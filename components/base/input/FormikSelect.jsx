import { FastField } from 'formik';
import { forwardRef } from 'react';
import CustomSelect from './CustomSelect';

const FormikSelect = forwardRef((props, ref) => {
  const { name, options } = props;
  const getOption = (val) => {
    if (!val) return '';
    return options.find((opt) => opt.value === val);
  };
  return (
    // Picker for start of range
    <FastField name={name}>
      {({ field, form }) => {
        const { setFieldValue } = form;
        const { value } = field;
        return (
          <CustomSelect
            {...props}
            value={getOption(value) || ''}
            onChange={(val) => setFieldValue(name, val.value)}
            ref={ref}
          />
        );
      }}
    </FastField>
  );
});

FormikSelect.displayName = 'FormikSelect';

export default FormikSelect;
