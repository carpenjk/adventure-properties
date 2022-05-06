import { GlobalStyles } from '../styles/global/base';
import Navbar from './navbar/Navbar';
import Header from './base/semantic/Header';
import Section from './base/semantic/Section';
import PageFooter from './footer/PageFooter';
import { footerNavData } from '../data/data';
import Skeleton from './skeleton';

const Layout = ({ children }) => (
  <>
    <Header position="fixed">
      <Navbar />
    </Header>
    <Skeleton>{children}</Skeleton>
    <Section semKey="footer" position="relative">
      <PageFooter navData={footerNavData} />
    </Section>
    <GlobalStyles />
  </>
);

export default Layout;
