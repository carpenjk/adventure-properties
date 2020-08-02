import React from 'react';
import App from 'next/app';
import { ConfigProvider } from '../context';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ConfigProvider>
        <Component {...pageProps} />
      </ConfigProvider>
    );
  }
}

export default MyApp;
