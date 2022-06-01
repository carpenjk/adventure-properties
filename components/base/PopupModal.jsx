import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';
import { useRef } from 'react';
import ScrollLock from '../scrollLock/ScrollLock';

const StyledPopupModal = styled.div` 
  content: ' ';
  position: fixed;
  display: none;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 999999;

  &.popup-isConditionallyOpen {
    display: none;
    ${condition('isOpen')`
      display: block;
    `}
  }

  ${breakpoint(1)`
    &.popup-isConditionallyOpen {
      display: none;
      ${condition('isOpen')`
        display: block;
      `}
    }
  `}

}
`;

const PopupModal = (props) => {
  const { isOpen, lockScroll, children } = props;
  const modalRef = useRef();
  const _lockScroll = isOpen && lockScroll;
  return (
    <>
      {_lockScroll && <ScrollLock scrollNode={modalRef} reserveScrollBarGap />}
      <StyledPopupModal
        isOpen={isOpen}
        className={isOpen ? 'popup-isConditionallyOpen' : ''}
        ref={modalRef}
      >
        {children}
      </StyledPopupModal>
    </>
  );
};

export default PopupModal;
