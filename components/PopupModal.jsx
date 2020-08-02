import styled from 'styled-components';
import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  enableBodyScroll,
} from 'body-scroll-lock';
import { useEffect, useRef } from 'react';
const StyledPopupModal = styled.div` 
  content: ' ';
  position: fixed;
  display: block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 999999;
}
`;

const PopupModal = (props) => {
  const modalRef = useRef();
  const { open } = props;
  useEffect(() => {
    disableBodyScroll(modalRef.current);
    return () => {
      clearAllBodyScrollLocks();
      // enableBodyScroll(modalRef.current);
    };
  });
  if (open) {
    return <StyledPopupModal ref={modalRef}>{props.children}</StyledPopupModal>;
  } else {
    return <div></div>;
  }
};

export default PopupModal;
