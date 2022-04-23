import styled from 'styled-components';

const StyledLayout = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const PropertyLayout = ({ children }) => (
  <StyledLayout>{children}</StyledLayout>
);

export default PropertyLayout;
