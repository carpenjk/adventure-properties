import { Header, Section } from '@carpenjk/base/semantic';
import { Fixed } from '@carpenjk/base/layout';
import { GlobalStyles } from '../styles/global/base';
import Navbar from './navbar/Navbar';
import PageFooter from './footer/PageFooter';
import { footerNavData } from '../data/data';

const Layout = ({ children }) => (
  <>
    <Header position="fixed" adjustForScrollBar>
      <Navbar />
    </Header>
    {/* <Skeleton>{children}</Skeleton> */}
    {children}
    <Fixed useFillerElement bottom width="100%">
      <Section
        tw={{ variant: 'footer' }}
        position="relative"
        adjustForScrollBar
      >
        <PageFooter navData={footerNavData} />
      </Section>
    </Fixed>
    <GlobalStyles />
  </>
);

export default Layout;
