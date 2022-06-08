import Head from 'next/head';
import { useState, useCallback } from 'react';
import { Formik } from 'formik';
import { mediaStyles } from '../Media';

import LocationInput from '../components/base/input/LocationInput';

const Test = () => {
  const [inputRef, setInputRef] = useState();
  const setCallbackRef = useCallback(
    (elem) => {
      setInputRef(elem);
    },
    [setInputRef]
  );
  return (
    <>
      <Head>
        <title>Adventure Properties</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Formik
        initialValues={{
          destination: '',
        }}
      >
        <LocationInput
          key="destination"
          id="destination"
          name="destination"
          tw={{ semKey: 'input', variant: 'searchBar' }}
          placeholder={{
            value: 'Destination',
            translateX: '-21px',
            translateY: '-18px',
          }}
          textOffset="26px"
          icon="/static/assets/searchbar/icon/location.svg"
          iconOffset="5px"
          width={['100%', '340px']}
          autoCompleteWidth="100%"
          autoCompleteOptions={{
            autoCompleteWidth: '100%',
          }}
          showInsetPlaceholder
          ref={setCallbackRef}
        />
      </Formik>
    </>
  );
};
export default Test;
