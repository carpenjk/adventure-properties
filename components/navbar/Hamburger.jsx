import styled from 'styled-components';
const StyledHamburger = styled.button`
  display: ${({ isOpen }) => (isOpen ? 'none' : 'block')};
  background: none;
  height: ${({ buttonSize }) => buttonSize.height};
  width: ${({ buttonSize }) => buttonSize.width};

  svg {
    fill: ${({ color }) => color};
  }
`;
const Hamburger = (props) => {
  const { buttonSize, iconSize, color, wrapperClass, isOpen, onClick } = props;
  return (
    <StyledHamburger
      className={wrapperClass}
      buttonSize={buttonSize}
      color={color}
      isOpen={isOpen}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize.width}
        height={iconSize.height}
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    </StyledHamburger>
  );
};

export default Hamburger;
