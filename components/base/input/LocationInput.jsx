import { forwardRef, useEffect, useRef, useState } from 'react';
import { useField, useFormikContext } from 'formik';

import InputBase from './InputBase';
import { getLocationDisplay } from '../../../utils/location';
import useAutoComplete from '../../hooks/UseAutoComplete';

const LocationInput = forwardRef(
  ({ name, autoCompleteOptions, ...props }, ref) => {
    const { setFieldValue } = useFormikContext();
    const [formikFields, meta, helpers] = useField(name);
    const [acValues, setAcValues] = useState([]);
    const inputRef = useRef();
    const wrapperRef = useRef();

    async function fetchACValues(q) {
      try {
        const res = await fetch(
          `/api/location/autocomplete?q=${q}&countrycodes=us&tag=place:city,place:town,place:village`
        );
        const response = await res.json();

        const { data } = response;
        // if error, likely no match
        if (data.error) {
          setAcValues([]);
        }
        if (data && data.map) {
          setAcValues(data.map((sugg) => getLocationDisplay(sugg)));
        }
      } catch (e) {
        // do something
        console.log(
          '🚀 ~ file: LocationInput.jsx ~ line 30 ~ fetchACValues ~ e',
          e
        );
      }
    }

    function handleInput(e) {
      const q = e.target.value;
      if (q === '') {
        setAcValues([]);
        return;
      }
      fetchACValues(q);
    }

    function onSelect(val) {
      setFieldValue(name, val);
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }

    useEffect(() => {
      if (inputRef && inputRef.current) {
        ref(inputRef.current);
      }
    }, [inputRef, ref]);

    const { forceClose, autoCompleteWidth } = autoCompleteOptions;
    const { fields: acFields, autoComplete } = useAutoComplete({
      values: acValues,
      onSelect,
      onInput: [handleInput, 750],
    });

    const { acControl } = autoComplete;

    useEffect(() => {
      if (forceClose) {
        acControl.close();
      }
    }, [forceClose, acControl]);

    return (
      <div ref={wrapperRef}>
        <InputBase
          name={name}
          {...formikFields}
          {...props}
          {...acFields}
          autoCompleteWidth={autoCompleteWidth}
          autoComplete={autoComplete}
          ref={inputRef}
        />
      </div>
    );
  }
);

export default LocationInput;
