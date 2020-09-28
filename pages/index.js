import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import CustomSelect from '../components/base/input/CustomSelect';
import Select from 'react-select';
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
import { useEffect } from 'react';

const guestOptions = [
  {
    value: '1',
    label: '1',
    selectedLabel: '1 Guest',
  },
  {
    value: '2',
    label: '2',
    selectedLabel: '2 Guests',
  },
  {
    value: '3',
    label: '3',
    selectedLabel: '3 Guests',
  },
  {
    value: '4',
    label: '4',
    selectedLabel: '4 Guests',
  },
  {
    value: '5',
    label: '5',
    selectedLabel: '5 Guests',
  },
  {
    value: '6',
    label: '6',
    selectedLabel: '6 Guests',
  },
  {
    value: '7',
    label: '7',
    selectedLabel: '7 Guests',
  },
  {
    value: '8',
    label: '8',
    selectedLabel: '8 Guests',
  },
  {
    value: '9',
    label: '9',
    selectedLabel: '9 Guests',
  },
  {
    value: '10',
    label: '10+',
    selectedLabel: '2 Guests',
  },
];

// static variables
const HERO_IMAGE = '../static/assets/lofoten-2220461.png';

const Index = () => {
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
          <Navbar />
        </header>
        <section style={{ position: 'relative', top: '80px', width: '100vw' }}>
          <HeroContainer backgroundImage={HERO_IMAGE} />
          <SearchBar key="theonlysearchbar" openMaxWidth={['none', '1000px']} />
        </section>
        {/* <div style={{ position: 'relative', top: '100px' }}>
          <CustomSelect
            innerKey={'testGuestsSelect'}
            theme={theme}
            key="testGuest"
            id="testGuest"
            placeholder="Guests"
            focusNext={false}
            icon={'./static/assets/searchbar/icon/guest.svg'}
            iconOffset={'0.5rem'}
            iconWidth={'1.6rem'}
            iconHeight={'1.6rem'}
            textOffset={'1.8rem'}
            width={'15rem'}
            placeholderColor={theme.colors.lightText}
            options={guestOptions}
            valueFunctions={{ set: (e) => console.log(e), get: null }}
            nextFocusRef={false}
            height="4rem" //! refactor? Set height of React-Select objects to match input styling:
          />
          <Select
            key="selectTest2"
            instanceId="react-select-2"
            className="input"
            classNamePrefix="customSelect"
            blurInputOnSelect={false}
            isSearchable={false}
            placeholder={'test'}
            options={guestOptions}
          />
        </div> */}
        {/* <section className="features">
          <div style={{ padding: '15px' }}>
            <CardContainer
              renderLayout={() => <PropertyCardLayout style="large" />}
            />
          </div>
        </section> */}
        <GlobalStyles />
      </React.Fragment>
    </ThemeProvider>
  );
};

export default Index;
