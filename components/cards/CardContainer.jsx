import styled from 'styled-components';
const Box = styled.div`
  display: inline-block;
  position: relative;
  background: #ffffff;
  border: 1px solid #cdf7f6;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  padding: 15px;
  cursor: pointer;
`;

const CardContainer = ({ renderLayout }) => {
  return <Box>{renderLayout()}</Box>;
};

export default CardContainer;
