import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { getConditionalProp } from '../utils/themeweaver-utils';

import { useEffect, useRef } from 'react';
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
    display: ${getConditionalProp('isOpen', ({ isOpen }) =>
      isOpen ? 'block' : 'none'
    )};
  }

  ${breakpoint(1)`
    &.popup-isConditionallyOpen {
      display: ${getConditionalProp(
        'isOpen',
        ({ isOpen }) => (isOpen ? 'block' : 'none'),
        1
      )};
    }
  `}

}
`;

const PopupModal = (props) => {
  const modalRef = useRef();
  const { isOpen } = props;

  return (
    <StyledPopupModal
      isOpen={isOpen}
      className={isOpen ? 'popup-isConditionallyOpen' : ''}
      ref={modalRef}
    >
      {props.children}
    </StyledPopupModal>
  );
};

export default PopupModal;
