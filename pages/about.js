import Head from 'next/head';
import { mediaStyles } from '../Media';
import ContentContainer from '../components/base/layout/ContentContainer';
import Section from '../components/base/semantic/Section';
import HeroContainer from '../components/hero/HeroContainer';
import HeroImage from '../components/hero/BackgroundImage';
import AboutBannerLayout from '../components/hero/heroBanner/AboutBannerLayout';

const Hero = (
  <HeroImage
    src="/static/assets/about/cabinOnWater-large.jpg"
    srcSet="/static/assets/about/cabinOnWater-small.jpg 640w, /static/assets/about/cabinOnWater-large.jpg 1920w"
    sizes="100vw"
    alt="Cabin on water"
  />
);

const About = () => {
  const a = 1;

  return (
    <>
      <Head>
        <title>About</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <ContentContainer tw={{ variant: 'about' }}>
          <Section tw={{ variant: 'about' }} position="relative">
            <HeroContainer
              tw={{ variant: 'about' }}
              image={Hero}
              bannerLayout={<AboutBannerLayout />}
              bannerPos={[
                { vertical: 'center', horizontal: 'center', test: 'hello' },
                { top: '150px' },
              ]}
            />
          </Section>
        </ContentContainer>
      </main>
    </>
  );
};

export default About;
