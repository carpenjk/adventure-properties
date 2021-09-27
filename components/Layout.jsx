import { GlobalStyles } from '../styles/global/base';
import Navbar from './navbar/Navbar';
import Header from './base/semantic/Header';
import Section from './base/semantic/Section';
import PageFooter from './footer/PageFooter';
import { footerNavData } from '../data/data';

const Layout = ({ children }) => (
  <>
    <Header position="fixed">
      <Navbar />
    </Header>
    {children}
    <Section semKey="footer" position="relative">
      <PageFooter navData={footerNavData} />
    </Section>
    <GlobalStyles />
  </>
);

export default Layout;
