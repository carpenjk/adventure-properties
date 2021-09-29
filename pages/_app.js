import React from 'react';
import App from 'next/app';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from '../contexts/context';
import { MediaContextProvider } from '../Media';
import Layout from '../components/Layout';
import { theme } from '../theme';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <MediaContextProvider>
            <ConfigProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ConfigProvider>
          </MediaContextProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default MyApp;
