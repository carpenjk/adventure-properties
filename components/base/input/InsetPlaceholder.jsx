import styled from 'styled-components';
import {
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
} from 'themeweaver';
import { getProp } from 'dataweaver';

const StyledPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: ${getProp('offset')};
  bottom: 0;
  right: 0;
  overflow: visible;
  font-family: ${getFontFamily({}, 'inherit')};
  font-weight: ${getFontWeight({}, 'normal')};
  font-size: ${getFontSize({}, '1.6rem')};
  letter-spacing: ${getLetterSpacing({}, '0.025em')};
  color: ${getColor({}, 'inherit')};
  transition: transform 0.35s ease-in, font-size 0.35s ease-in;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  &.isActive {
    transform: translate3d(
      ${getProp('translateX')},
      ${getProp('translateY')},
      0
    );
    font-size: 10px;
  }
`;

const InsetPlaceholder = (props) => {
  const { children, isActive, ...restProps } = props;
  return (
    <StyledPlaceholder {...restProps} className={isActive ? 'isActive' : ''}>
      {children}
    </StyledPlaceholder>
  );
};

export default InsetPlaceholder;
