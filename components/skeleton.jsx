import styled from 'styled-components';

const StyledSkeleton = styled.div`
  top: 0;
  min-height: 100vh;
`;
const Skeleton = ({ children }) => <StyledSkeleton>{children}</StyledSkeleton>;

export default Skeleton;
