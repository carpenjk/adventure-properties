import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import useWindowSize from './hooks/UseWindowSize';
import useIsoOnClickOutside from './hooks/UseIsoOnClickOutside';
import useLockBodyScroll from './hooks/UseLockBodyScroll';
import Hamburger from './Hamburger';
import CloseButton from './CloseButton';

const StyledHamburgerMenu = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: absolute;
  top: ${({ topHeight }) => topHeight};
  left: 0;
  right: 0;

  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  max-height: ${({ windowHeight, offsetTop }) => windowHeight - offsetTop}px;
  width: 100%;
  z-index: 9999999;

  background-color: var(--globalWhite);

  li button,
  li a {
    padding: 20px;
  }
`;

const HamburgerMenu = (props) => {
  //props
  const { topHeight, buttonClass, renderMenu } = props;
  //state
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //hooks
  const windowSize = useWindowSize();
  useLockBodyScroll();

  const [menuElement, setMenuElement] = useState(false);
  const setCallbackRef = useCallback((node) => {
    setMenuElement(node);
  });

  //handlers and helpers

  const moveSelectionUp = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const moveSelectionDown = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === menuItems.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  const closeMenu = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
  };
  const openMenu = () => {
    setIsOpen(true);
  };

  const handleKeydown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        moveSelectionUp();
        break;
      case 'ArrowDown':
        moveSelectionDown();
        break;
      case 'Escape':
        closeMenu();
      case 'Enter':
      case ' ': //space
        //navigation on link and buttons occurs and menu state closes
        closeMenu();
        break;
    }
  };

  const handleMenuClick = () => {
    closeMenu();
  };

  //lifecycle functions
  useEffect(() => {
    if (menuElement)
      setMenuItems(menuElement.querySelectorAll('[tabindex = "0"]'));
  }, [menuElement]);

  useEffect(() => {
    if (selectedIndex >= 0) menuItems[selectedIndex].focus();
  }, [selectedIndex]);

  useIsoOnClickOutside(menuElement, closeMenu, []);

  //render
  return (
    <React.Fragment>
      <Hamburger
        onClick={openMenu}
        wrapperClass={buttonClass}
        isOpen={isOpen}
        alt="menu"
        iconSize={{ height: '55px', width: '55px' }}
        buttonSize={{ height: topHeight, width: topHeight }}
        height={'55px'}
        width="55px"
        color="var(--action)"
      />
      <CloseButton
        onKeyDown={handleKeydown}
        onClick={closeMenu}
        isDisplayed={isOpen}
        focusOnOpen={true}
        wrapperClass={buttonClass}
        iconColor="var(--action)"
        iconSize="45px"
        buttonSize={{ height: topHeight, width: topHeight }}
      />
      <StyledHamburgerMenu
        onClick={handleMenuClick}
        onKeyDown={handleKeydown}
        isOpen={isOpen}
        topHeight={topHeight}
        offsetTop={menuElement.offsetTop}
        windowHeight={windowSize.height}
        ref={setCallbackRef}
      >
        {renderMenu()}
      </StyledHamburgerMenu>
    </React.Fragment>
  );
};

export default HamburgerMenu;
