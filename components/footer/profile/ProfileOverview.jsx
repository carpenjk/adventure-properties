import Link from 'next/link';
import styled from 'styled-components';
import { StyledProfileOverview } from './styled/StyledProfileOverview';

const P = styled.p`
  margin: 16px 0;
  font-family: 'Comfortaa';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 170%;
  color: blue;
`;

const A = styled.a``;

const ProfileOverview = () => (
  <StyledProfileOverview>
    <P>
      Hello, I am Jeremy Carpenter, a web developer based in Cleveland, Ohio.
      Sharpened by 7 years of implementing software as a consultant gathering
      requirements, designing, and building solutions, I am now realizing a long
      time dream to build the software itself. Prior to this, I consulted across
      the entire software development lifecycle complimenting and leading teams
      of other consultants and customers as we built solutions for integrating,
      modeling, and reporting on data used for financial reporting, budgeting,
      and forecasting. I enjoyed and excelled at this challenging work, but
      software development was calling me.
    </P>
    <P>
      Lately I have been focused on writing reusuable components with the React
      framework and refining the{' '}
      <Link passHref href="https://www.npmjs.com/package/@carpenjk/prop-x">
        <A target="_blank">prop-x</A>
      </Link>{' '}
      and{' '}
      <Link passHref href="https://www.npmjs.com/package/@carpenjk/themeweaver">
        <A target="_blank">themeweaver</A>
      </Link>{' '}
      libraries I created for using responsive properties and theming reusable
      components.
    </P>
    <P>
      In my spare time I enjoy, taking on new hobbies and can often be found
      paddling my kayak around Lake Erie or sliding down a mountain on skis.
    </P>
  </StyledProfileOverview>
);
export default ProfileOverview;
