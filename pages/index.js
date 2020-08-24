import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import CardContainer from '../components/cards/CardContainer';
import PropertyCardLayout from '../components/cards/PropertyCardLayout';
import Head from 'next/head';
import { mediaStyles } from '../components/Media';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar/SearchBar';
import HeroContainer from '../components/HeroContainer';

import { breakpoints } from '../static/global/breakpoints';

//*configs
import { GlobalStyles } from '../static/global/base';

// static variables
const HERO_IMAGE = '../static/assets/lofoten-2220461.png';

const Index = () => {
  console.log('theme:', theme);
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Head>
          <title>Adventure Properties</title>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <header style={{ position: 'fixed', zIndex: 9999999, width: '100%' }}>
          <Navbar mobileBreakpoint={breakpoints.mobileM} />
        </header>
        <section style={{ position: 'relative', top: '80px', width: '100vw' }}>
          <HeroContainer backgroundImage={HERO_IMAGE} />
          <SearchBar
            mobileBreakpoint={breakpoints.mobileM}
            mobileMaxWidth={'500px'}
            popupMaxScreenWidth={'800px'}
          />
        </section>
        <section className="features">
          <div style={{ padding: '15px' }}>
            <CardContainer
              renderLayout={() => <PropertyCardLayout style="large" />}
            />
          </div>
        </section>
        <GlobalStyles />
      </React.Fragment>
    </ThemeProvider>
  );
};

export default Index;
