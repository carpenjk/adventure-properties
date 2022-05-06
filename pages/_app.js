import React, { useState, useEffect } from 'react';
import { Router } from 'next/router';
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
import Spinner from '../components/base/Spinner';

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const start = () => {
  //     console.log('start');
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     console.log('findished');
  //     setLoading(false);
  //   };
  //   Router.events.on('routeChangeStart', start);
  //   Router.events.on('routeChangeComplete', end);
  //   Router.events.on('routeChangeError', end);
  //   return () => {
  //     Router.events.off('routeChangeStart', start);
  //     Router.events.off('routeChangeComplete', end);
  //     Router.events.off('routeChangeError', end);
  //   };
  // }, []);

  return (
    <CookiesProvider>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <MediaContextProvider>
            <ConfigProvider>
              <ReservationProvider>
                <Layout>
                  {loading ? (
                    <Spinner message="Loading" />
                  ) : (
                    <Component {...pageProps} />
                  )}
                </Layout>
              </ReservationProvider>
            </ConfigProvider>
          </MediaContextProvider>
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  );
}
