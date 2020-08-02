import useWindowSize from './hooks/UseWindowSize';
import useIsoLayoutEffect from './hooks/UseIsoLayoutEffect';
import { useRef } from 'react';
import styled from 'styled-components';

const Banner = styled.div`
  position: relative;
  top: 10rem;
  display: flex;
  flex-direction: column;
  padding 10px;
  margin: auto;
  width: 90%;
  max-width: 50.1rem;
  z-index: 999998;

  .wrapper{
    margin:0;
  }
  .banner H1 {
    margin: 0 0 10px 0;
  }
  .banner H2 {
    margin: 0;
  }
  .background{
    content: '';
    background: #FFFFFF;
    opacity: 0.85;
    
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
  @media (${(props) => props.mobileBreakpoint}) {
    position: absolute;
    left: 2.5rem;
    top: 10rem;
    margin: 0;
  }
`;

const HeroBanner = (props) => {
  const { mobileBreakpoint } = props;
  const windowSize = useWindowSize();
  const bannerRef = useRef(null);

  useIsoLayoutEffect(() => {
    if (bannerRef)
      bannerRef.current.style.top = `${
        100 + 100 * Math.min(Math.pow(1850 / windowSize.width, 40), 1)
      }px`;
  });

  return (
    <Banner
      className="banner"
      mobileBreakpoint={mobileBreakpoint}
      ref={bannerRef}
    >
      <div className="background" />
      <div className="wrapper">
        <h1>Live, Work, Play. Build Your Dream Adventure Today!</h1>
        <h2>
          We are a real estate company for people that love adventure and the
          outdoors. Buy or rent a new home for your adventure or creative
          studio.
        </h2>
      </div>
    </Banner>
  );
};

export default HeroBanner;
