import styled from 'styled-components';
import { getConditionalProp } from '../utils/componentMaps';
import useLockBodyScroll from './hooks/UseLockBodyScroll';
// import {
//   disableBodyScroll,
//   clearAllBodyScrollLocks,
//   enableBodyScroll,
// } from 'body-scroll-lock';

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
  const { isOpen } = props;
  useLockBodyScroll(true);
  // useEffect(() => {
  //   disableBodyScroll(modalRef.current, { reserveScrollBarGap: true });
  //   return () => {
  //     clearAllBodyScrollLocks();
  //     // enableBodyScroll(modalRef.current);
  //   };
  // });
  return <StyledPopupModal ref={modalRef}>{props.children}</StyledPopupModal>;
};

export default PopupModal;
