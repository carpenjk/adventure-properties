import styled from 'styled-components';
import { condition, getProp } from 'dataweaver';
import { useState } from 'react';

const StyledOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-items: ${getProp('alignItems')};
  z-index: 99999;
  background-color: white;
  ${condition('isOpen')`
    display: flex;
  `}
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
  font-size: 20px;
  cursor: pointer;
  background: transparent;
  &:hover {
    border: 1px dotted rgb(150, 150, 150);
    background: rgba(220, 220, 220, 0.3);
  }
`;
const FullScreenOverlay = ({ children, onClose, isOpen, alignItems }) => (
  <StyledOverlay isOpen={isOpen} alignItems={alignItems}>
    <StyledCloseButton onClick={onClose}>X</StyledCloseButton>
    {children}
  </StyledOverlay>
);

export default FullScreenOverlay;
