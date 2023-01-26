import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import OverlayButton from './OverlayButton';

const StyledNXBackButton = styled(OverlayButton)`
  position: fixed;
  top: 90px;
  left: 10px;
  z-index: 10001;

  img {
    padding-right: 5px;
  }
`;

const NXBackButton = ({ children }) => {
  const router = useRouter();
  return (
    <StyledNXBackButton onClick={router.back}>
      <img src="../static/assets/misc/back arrow.svg" alt="back arrow" />
      {children || 'back'}
    </StyledNXBackButton>
  );
};

export default NXBackButton;
