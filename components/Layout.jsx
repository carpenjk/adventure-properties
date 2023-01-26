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
