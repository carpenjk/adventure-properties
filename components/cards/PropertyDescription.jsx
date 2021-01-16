import styled from 'styled-components';
import { condition } from 'dataweaver';

const StyledDescription = styled.div`
  width: 100%;
  padding: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${condition('hide')`
    display: none;
  `}
`;

const PropertyDescription = ({ description, hide }) => {
  console.log('🚀 ~ file: PropertyDescription.jsx ~ line 1 ~ hide', hide);
  return <StyledDescription hide={hide}>{description}</StyledDescription>;
};

export default PropertyDescription;
