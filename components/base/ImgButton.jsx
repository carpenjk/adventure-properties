import styled from 'styled-components';

const StyledImgButton = styled.button`
  position: relative;
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
`;
const ImgButton = ({ onClick, type, alt, ...imgProps }) => (
  <StyledImgButton onClick={onClick} type={type}>
    <img alt={alt} {...imgProps} />
  </StyledImgButton>
);

export default ImgButton;
