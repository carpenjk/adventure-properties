import styled from 'styled-components';
import React from 'react';
import { getMaxWidth } from '@carpenjk/themeweaver';
import { breakpoint } from '@carpenjk/prop-x/css';

import FeaturesHeader from './FeaturesHeader';
import PropertyCard from '../property/cardLayouts/PropertyCard';
import FeaturesFooter from './FeaturesFooter';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: ${({ theme }) => theme.space[5]}px;
  padding-bottom: ${({ theme }) => theme.space[5]}px;
  max-width: ${getMaxWidth('content', '1350px')};

  > *:last-child {
    align-self: flex-start;
  }
`;

const StyledContent = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;

  ${breakpoint(2)`
    width: auto;
    flex-direction: row;
    align-items: center;
  `}
`;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  max-width: 466px;
  padding-top: ${({ theme }) => theme.space[2]}px;
  padding-bottom: ${({ theme }) => theme.space[2]}px;

  ${breakpoint(1)`
    flex: none;
    width: 100%;
    max-width: none;
  `}

  ${breakpoint(2)`
    flex: 1 1 341px;
    width: auto;
    margin-right: ${({ theme }) => theme.space[5]}px;

    &:nth-Child(3) {
      margin-right: 0
    }
  `}
`;

const FeaturesContainer = ({ items, topic, isPersonalized, query }) => {
  const headerPrefix = isPersonalized
    ? 'Because you like'
    : 'Favorite properties for';
  const headerTopic = topic.header || topic;
  const footerTopic = topic.footer || topic;
  return (
    <StyledContainer>
      <FeaturesHeader prefix={headerPrefix} topic={headerTopic} />
      <StyledContent>
        {items.map((item) => (
          <StyledListItem key={item.cmsID}>
            <PropertyCard
              property={item}
              scale={1.02}
              scaleOnHover={[true, true, true]}
              scaleOnFocus={[true, true, true]}
              showDescription={[false, true, false]}
            />
          </StyledListItem>
        ))}
      </StyledContent>
      <FeaturesFooter
        href={{
          pathname: '/properties/search',
          query,
        }}
        topic={footerTopic}
      />
    </StyledContainer>
  );
};

export default FeaturesContainer;
