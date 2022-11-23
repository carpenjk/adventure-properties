import Head from 'next/head';
import ClientOnly from '@carpenjk/client-only';
import { useState, useCallback } from 'react';
import TestComponent from '../components/TestComponent';
import { mediaStyles } from '../Media';
// import LocationInput from '../components/base/input/LocationInput';

const Test = () => (
  <>
    <Head>
      <title>Adventure Properties</title>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{ __html: mediaStyles }}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <ClientOnly>
      <TestComponent width={['50px', '200px', '300px', '400px', '500px']} />
    </ClientOnly>
  </>
);
export default Test;
