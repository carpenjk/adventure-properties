import Link from 'next/link';
import styled, { ThemeContext } from 'styled-components';
import React, {
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
} from 'react';
import {
  breakpoint,
  getMaxWidth,
  getPaddingTop,
  getPaddingBottom,
  useBreakpoints,
  getPaddingRight,
  getPaddingLeft,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getMinHeight,
  getMinWidth,
  getMaxHeight,
  getFontFamily,
  getFontWeight,
  getFontSize,
  getLineHeight,
  getLetterSpacing,
  getColor,
} from 'themeweaver';
import client from '../../Contentful';

import ResultHeader from './ResultHeader';
import Property from '../cards/Property';
import PropertyCardLayout from '../cards/PropertyCardLayout';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify- content: center;
  align-items: center;
  width: 100%;
  padding-top:${getPaddingTop('results', '32px')};
  padding-right: ${getPaddingRight('results', '0')};
  padding-bottom:${getPaddingBottom('results', '32px')};
  padding-left: ${getPaddingLeft('results', '0')};
  margin-top: ${getMarginTop('results', '0')};
  margin-right: ${getMarginRight('results', '0')};
  margin-bottom: ${getMarginBottom('results', '0')};
  margin-left: ${getMarginLeft('results', '0')};
  min-height: ${getMinHeight('results', '0')};
  min-width: ${getMinWidth('results', '0')};
  max-width: ${getMaxWidth('content', '1350px')};
  max-height: ${getMaxHeight('results', 'none')};
  

  > *:last-child {
    align-self: flex-start;
  }

`;

const StyledContent = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin: 0;

  ${breakpoint(2)`
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

  `}
`;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: ${getMaxWidth('results_item', '450px')};

  ${breakpoint(1)`
    flex: none;
    width: 100%;
    max-width: none;
  `}

  ${breakpoint(2)`
    flex: 1 1 33.3333%;
  `}
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  width: 100%;

  font-size: ${getFontSize('results_footer', 'inherit')};
  min-height: 2.2em;

  & > a {
    color: ${getColor('results_footer', 'inherit')};
    font-family: ${getFontFamily('results_footer', 'inherit')};
    font-weight: ${getFontWeight('results_footer', 'bold')};
    font-style: normal;
    font-size: ${getFontSize('results_footer', 'inherit')};
    line-height: ${getLineHeight('results_footer', '1.5em')};
    letter-spacing: ${getLetterSpacing('results_footer', '0.025em')};
    text-decoration-line: underline;
  }
`;

const ResultsContainer = ({ items }) => {
  const topic = 'skiing';
  // const picUrl = '/static/assets/lofoten-2220461.png';
  const theme = useContext(ThemeContext);
  const br = useBreakpoints(theme);

  async function fetchProperties() {
    const results = await client.getAsset('6VW7ZyCNS3kTPZJFqhLCSf');
    return results;
  }

  const [properties, setProperties] = useState([]);
  const [itemRefs, setItemRefs] = useState([]);

  const addItemRef = useCallback((item) => {
    setItemRefs((prevValue) => [...prevValue, item]);
  }, []);

  const contentRef = useRef(null);

  //* effects *************************************************************
  useEffect(() => {
    async function getProperties() {
      const allProperties = await fetchProperties();
      setProperties(allProperties);
    }
    getProperties();
  }, []);

  const buildPicUrl = useCallback(() => {
    if (properties && properties.fields) {
      return `http:${properties.fields.file.url}?w=325`;
    }
    return undefined;
  }, [properties]);

  return (
    <StyledContainer>
      <ResultHeader prefix="Because you like" topic={topic} />
      <StyledContent ref={contentRef}>
        {items.map((item) => (
          <StyledListItem key={item.key}>
            <Property
              property={item}
              scale={1.11}
              scaleOnHover={[false, false, true]}
              scaleOnFocus={[false, false, true]}
              showDescription={br.current.width < br.br[2]}
              innerRef={addItemRef}
              cardLayout={() => (
                <PropertyCardLayout
                  variant="large"
                  data={item}
                  picUrl={buildPicUrl}
                />
              )}
            />
          </StyledListItem>
        ))}
      </StyledContent>

      <StyledFooter>
        <Link href="/property">
          <a>More Properties based on {topic}</a>
        </Link>
      </StyledFooter>
    </StyledContainer>
  );
};

export default ResultsContainer;
