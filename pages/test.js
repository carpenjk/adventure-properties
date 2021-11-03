import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Portal } from 'react-portal';
import { mediaStyles } from '../Media';

const Test = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
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
      {isMounted && (
        <Portal>
          <div>hello</div>
        </Portal>
      )}
    </>
  );
};
export default Test;
