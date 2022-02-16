import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding-top: ${({ theme }) => theme.space[1]}px;
  padding-left: ${({ theme }) => theme.space[2]}px;
  padding-right: ${({ theme }) => theme.space[2]}px;
  padding-bottom: ${({ theme }) => theme.space[1]}px;
  max-width: 500px;
`;

const ReviewContainer = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);

export default ReviewContainer;
