import React, { useState, useEffect } from 'react';
import { Router } from 'next/router';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';
import { CookiesProvider } from 'react-cookie';
import { ConfigProvider } from '../contexts/context';
import { MediaContextProvider } from '../Media';
import Layout from '../components/Layout';
import { theme } from '../theme';
import '../styles/global/datepicker.css';
import { ReservationProvider } from '../contexts/ReservationContext';
import Spinner from '../components/base/spinner/Spinner';
import { SpinnerProvider } from '../components/base/spinner/SpinnerContext';

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <CookiesProvider>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <MediaContextProvider>
            <ConfigProvider>
              <ReservationProvider>
                <SpinnerProvider>
                  <Layout>
                    {loading && <Spinner delay={900} />}
                    <Component {...pageProps} />
                  </Layout>
                </SpinnerProvider>
              </ReservationProvider>
            </ConfigProvider>
          </MediaContextProvider>
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  );
}
