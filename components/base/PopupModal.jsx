import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';

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
  const { isOpen, children } = props;
  console.log('render popup');
  return (
    <StyledPopupModal
      isOpen={isOpen}
      className={isOpen ? 'popup-isConditionallyOpen' : ''}
    >
      {children}
    </StyledPopupModal>
  );
};

export default PopupModal;
