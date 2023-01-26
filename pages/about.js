import Head from 'next/head';
import { Hero } from '@carpenjk/hero';
import { ContentContainer } from '@carpenjk/base/layout';
import { Section } from '@carpenjk/base/semantic';
import { mediaStyles } from '../Media';
import AboutBannerLayout from '../components/hero/AboutBannerLayout';

const heroImgProps = {
  src: '/static/assets/about/cabinOnWater-large.jpg',
  srcSet:
    '/static/assets/about/cabinOnWater-small.jpg 640w, /static/assets/about/cabinOnWater-large.jpg 1920w',
  sizes: '100vw',
  alt: 'Cabin on water',
};

const About = () => (
  <>
    <Head>
      <title>About</title>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{ __html: mediaStyles }}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <ContentContainer tw={{ variant: 'about' }}>
      <Section tw={{ variant: 'about' }} position="relative">
        <Hero
          tw={{ variant: 'about' }}
          image={heroImgProps}
          bannerLayout={<AboutBannerLayout />}
          bannerPos={[
            { vertical: 'center', horizontal: 'center', test: 'hello' },
            { top: '150px' },
          ]}
        />
      </Section>
    </ContentContainer>
  </>
);

export default About;
