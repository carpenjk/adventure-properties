import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { getProp } from 'dataweaver';

const StyledCompartment = styled.div`
  flex: none;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

  ${breakpoint(1)`
    flex-direction: row;
    align-items: initial;
    width: calc(100% / ${getProp('numOfCompartments')});  
    > div {
      margin-left: 2%;
      margin-right: 2%;
    }
    
  `}
`;

const SlideCompartment = (props) => {
  const { renderLayout, numOfCompartments } = props;

  return (
    <StyledCompartment numOfCompartments={numOfCompartments}>
      {renderLayout()}
    </StyledCompartment>
  );
};

export default SlideCompartment;
