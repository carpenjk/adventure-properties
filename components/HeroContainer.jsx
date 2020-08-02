import HeroBanner from './HeroBanner';
import SearchBar from './SearchBar';
const HeroContainer = () => {
  return (
    <div className="heroContainer">
      <HeroBanner />
      <SearchBar />
      <style jsx>
        {`
          .heroContainer {
            position: relative;
            width: 100%;
            height: 81.5vh;
            background: url(../static/assets/lofoten-2220461.png) no-repeat
              center / cover;
          }
          .hero {
            width: 100%;
            object-fit: cover;
          }
        `}
      </style>
    </div>
  );
};

export default HeroContainer;
