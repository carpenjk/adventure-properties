import Head from 'next/head';
import { Header, Section } from '@carpenjk/base/semantic';
import { Fixed } from '@carpenjk/base/layout';
import { GlobalStyles } from '../styles/global/base';
import Navbar from './navbar/Navbar';
import PageFooter from './footer/PageFooter';

const Layout = ({ children }) => (
  <>
    <Header position="fixed" adjustForScrollBar>
      <Navbar />
    </Header>
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
    </Head>
    <main style={{ position: 'relative', paddingBottom: '55px' }}>
      {/* <Skeleton>{children}</Skeleton> */}
      {children}
    </main>
    <Fixed useFillerElement bottom width="100%" style={{ zIndex: 999999 }}>
      <Section
        tw={{ variant: 'footer' }}
        position="relative"
        adjustForScrollBar
      >
        <PageFooter />
      </Section>
    </Fixed>
    <GlobalStyles />
  </>
);

export default Layout;
