import styled from 'styled-components';
import { useState } from 'react';
import { condition } from 'dataweaver';

const StyledContainer = styled.div`
  position: relative;
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  ${condition('isOpen')`
      background-color: ${({ theme }) => theme.colors.primary[0]};
  `}
`;
const StyledIconContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 16px;
  z-index: 999;

  & svg path {
    fill: ${({ theme }) => theme.colors.primary[0]};
  }

  ${condition('isOpen')`
  background-color: ${({ theme }) => theme.colors.primary[0]};
  & svg path {
    fill: ${({ theme }) => theme.colors.primary[1]};
  }
  `}
`;

const StyledList = styled.ul`
  position: absolute;
  top: -5000px;
  width: 200px;
  right: 0;
  background-color: ${({ theme }) => theme.colors.primary[0]};
  z-index: 998;

  > li {
    width: 100%;
    max-width: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  > li > * {
    margin: 0;
    padding-left: 8px;
    display: flex;
    justify-content: flex-start;
  }

  > li > * {
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
    font-size: 16px;
    line-height: 250%;
    /* identical to box height */

    display: flex;
    align-items: center;
  }

  ${condition('isOpen')`
    top: 100%;
  `}
`;

const IconDropDown = ({ icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleMouseEnter() {
    setIsOpen(true);
  }
  function handleMouseLeave() {
    setIsOpen(false);
  }

  const Icon = icon;

  return (
    <StyledContainer
      isOpen={isOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledIconContainer isOpen={isOpen}>
        <Icon />
        {/* <img src={icon} alt="Account Submenu" /> */}
      </StyledIconContainer>
      <StyledList isOpen={isOpen} isHover={isOpen}>
        {children && children.map((item, i) => <li key={i}>{item}</li>)}
      </StyledList>
    </StyledContainer>
  );
};

export default IconDropDown;
