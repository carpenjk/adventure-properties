import styled from 'styled-components';

const StyledUpArrow = styled.span`
  padding-top: 7px;
  padding-right: 7px;
  padding-left: 7px;
`;
const StyledIcon = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border-left: 2px solid;
  border-top: 2px solid;
  border-color: ${({ theme }) => theme.colors.tertiary};
  transform: rotate(45deg) translateX(50%);
`;
const UpArrow = () => (
  <StyledUpArrow className="arrow-up">
    <StyledIcon />
  </StyledUpArrow>
);

export default UpArrow;
