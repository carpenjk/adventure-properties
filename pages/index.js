import Link from 'next/link';
import Navbar from '../components/Navbar';
import HeroContainer from '../components/HeroContainer';
import InputDate from '../components/react-day-light/InputDate';
import { SearchBar_config } from '../compConfig';

import { GlobalStyles } from '../global/base.jsx';
import HeroBanner from '../components/HeroBanner';

const Index = () => (
  <div>
    <Navbar />
    <HeroContainer />
    <InputDate input={SearchBar_config.inputs[2]} width="38rem" />
    <h1>Hello from home</h1>
    <GlobalStyles />
    <style jsx>
      {`
        .hero {
          width: 100%;
          object-fit: cover;
        }
      `}
    </style>
  </div>
);

export default Index;
