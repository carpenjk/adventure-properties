import Head from 'next/head';
import { mediaStyles } from '../../Media';

const About = () => (
  <>
    <Head>
      <title>Adventure Properties - Title</title>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{ __html: mediaStyles }}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div>hello from about</div>
  </>
);

export default About;
