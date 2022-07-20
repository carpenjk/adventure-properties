import Head from 'next/head';
import { useState, useCallback } from 'react';
import { mediaStyles } from '../Media';
// import LocationInput from '../components/base/input/LocationInput';

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
      <div>Hello People</div>
    </>
  );
};
export default Test;
