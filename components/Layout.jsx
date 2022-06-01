import { GlobalStyles } from '../styles/global/base';
import Navbar from './navbar/Navbar';
import Header from './base/semantic/Header';
import Section from './base/semantic/Section';
import PageFooter from './footer/PageFooter';
import { footerNavData } from '../data/data';
import Fixed from './base/layout/Fixed';

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
