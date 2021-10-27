import React from 'react';
import App from 'next/app';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';
import { CookiesProvider } from 'react-cookie';
import { ConfigProvider } from '../contexts/context';
import { MediaContextProvider } from '../Media';
import Layout from '../components/Layout';
import { theme } from '../theme';
import '../styles/global/datepicker.css';
import { ReservationProvider } from '../contexts/ReservationContext';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <CookiesProvider>
        <Provider session={pageProps.session}>
          <ThemeProvider theme={theme}>
            <MediaContextProvider>
              <ConfigProvider>
                <ReservationProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ReservationProvider>
              </ConfigProvider>
            </MediaContextProvider>
          </ThemeProvider>
        </Provider>
      </CookiesProvider>
    );
  }
}

export default MyApp;
