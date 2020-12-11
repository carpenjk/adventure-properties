import styled from 'styled-components';

const StyledDescription = styled.div`
  width: 100%;
  padding: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PropertyDescription = ({ description }) => (
  <StyledDescription>{description}</StyledDescription>
);

export default PropertyDescription;
