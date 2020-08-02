// import { colors, GlobalStyles } from '../global/base';
const HeroBanner = () => {
  return (
    <div className="banner">
      <div className="wrapper">
        <h1>Live, Work, Play. Build Your Dream Adventure Today!</h1>
        <h2>
          We are a real estate company for people that love adventure and the
          outdoors. Buy or rent a new home for your adventure or creative studio
        </h2>
      </div>
      <div className="background" />
      <style jsx>
        {`
        .banner{
          display: flex
          flex-direction: column;
          padding 10px;

          position: absolute;
          width: 50.1rem;
          left: 2.5rem;
          top: 10rem;

          background: #FFFFFF;
          opacity: 0.85;
          }
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
            filter: blur(10px);
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
          }
        `}
      </style>
    </div>
  );
};

export default HeroBanner;
