import React from 'react';
import App from 'next/app';
import { ConfigProvider } from '../contexts/context';
import { MediaContextProvider } from '../Media';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <MediaContextProvider>
        <ConfigProvider>
          <Component {...pageProps} />
        </ConfigProvider>
      </MediaContextProvider>
    );
  }
}

export default MyApp;
