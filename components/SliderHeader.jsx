import styled from 'styled-components';
const StyledHeader = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: flex-start;
  h2 {
    color: blue;
  }
`;
const StyledTopic = styled.span`
  font-style: bold;
  color: red;
`;
const SliderHeader = (props) => {
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

export default SliderHeader;
