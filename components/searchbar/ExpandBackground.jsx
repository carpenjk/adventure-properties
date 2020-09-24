import styled from 'styled-components'

const StyledBackground = styled.div`
  background-color: transparent;
  border-radius: ${getBorderRadius('searchBar', '8px')};
  position: absolute;
  top: -${getPaddingTop('searchBar', '1rem')};
  right: -${getPaddingRight('searchBar', '1rem')};
  bottom: -${getPaddingBottom('searchBar', '1rem')};
  left: -${getPaddingLeft('searchBar', '1rem')};
  z-index: -999999;

  ${(props) =>
    props.isExpanded &&
    `
      background-color: ${getBackgroundColor('searchBar', 'none')(props)};
    `}

  ${breakpoint(1)`
    border-radius: ${getBorderRadius('searchBar', '8px')};
    top: -${getPaddingTop('searchBar', '1rem')};
    right: -${getPaddingRight('searchBar', '1rem')};
    bottom: -${getPaddingBottom('searchBar', '1rem')};
    left: -${getPaddingLeft('searchBar', '1rem')};
    ${(props) =>
      props.isExpanded &&
      `
        right: 0;
      `}
    `}
`;

StyledBackground.defaultProps = {
  isExpanded: false
}

const ExpandBackground = (props) => {
  const {isExpanded }
  return ( 
    <StyledBackground isExpanded={isExpanded}/>
   );
}
 
export default ExpandBackground;