import styled from 'styled-components';

const StyledHeader = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: flex-start;

  h2 {
    font-family: ${({ theme }) => theme.fonts.poppins};
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.action[1]};
    padding-top: ${({ theme }) => theme.space[3]}px;
    padding-bottom: ${({ theme }) => theme.space[3]}px;
    margin: 0;
  }
`;
const StyledTopic = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;
const FeaturesHeader = (props) => {
  const { prefix, topic } = props;
  return (
    <StyledHeader>
      <h2>
        <span>{prefix}</span>
        <span> </span>
        <StyledTopic>{topic}</StyledTopic>
      </h2>
    </StyledHeader>
  );
};

export default FeaturesHeader;
