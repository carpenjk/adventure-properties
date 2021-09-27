import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from '../contexts/context';
import { MediaContextProvider } from '../Media';
import Layout from '../components/Layout';
import { theme } from '../theme';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <MediaContextProvider>
          <ConfigProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ConfigProvider>
        </MediaContextProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
