import { useRef } from 'react';
import styled from 'styled-components';
import {
  getBorderRadius,
  getColor,
  getBackgroundColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
} from 'themeweaver';
import { getProp } from 'dataweaver';

const StyledLabel = styled.label`
  padding: 2px;
  color: ${getColor({}, 'inherit')};
  border-radius: ${getBorderRadius({}, '5px')};
  background-color: ${getBackgroundColor({}, 'initial')};
  font-family: ${getFontFamily({}, 'inherit')};
  font-weight: ${getFontWeight({}, 'normal')};
  font-size: ${getFontSize({}, '1.6rem')};
  letter-spacing: ${getLetterSpacing({}, '0.025em')};
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
  &:focus-within {
    outline: 3px solid ${({ theme }) => `${theme.colors.link[0]}`};
  }
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 0;
  height: 0;
  font-size: inherit;

  &:checked ~ .checkbox-custom {
    background-color: ${getProp('bg_checked')};
    border-radius: ${getBorderRadius({}, '5px')};
    -webkit-transform: rotate(0deg) scale(1);
    -ms-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
    opacity: 1;
    border: 2px solid ${getProp('bg_checked')};
  }

  &:checked ~ .checkbox-custom::after {
    -webkit-transform: rotate(45deg) scale(1);
    -ms-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
    opacity: 1;
    width: 0.31em;
    height: 0.68em;
    border: solid ${getProp('fg_checked')};
    border-width: 0 2px 2px 0;
    background-color: transparent;
    border-radius: 0;
  }
`;

const CustomCheckbox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.1em;
  width: 1.1em;
  margin-right: 1.5rem;
  background-color: ${getProp('bg')};
  border-radius: ${getBorderRadius({}, '5px')};
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  border: 2px solid ${getProp('fg')};

  &::after {
    content: '';
    height: 0px;
    width: 0px;
    border-radius: 5px;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(0deg) scale(0);
    -ms-transform: rotate(0deg) scale(0);
    transform: rotate(0deg) scale(0);
    opacity: 1;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
  }
`;

const DEFAULT_TW = {
  semKey: 'checkbox',
};

const Checkbox = (props) => {
  const {
    id,
    value,
    label,
    fg,
    bg,
    fgChecked,
    bgChecked,
    onChange,
    tw,
  } = props;
  const filterRef = useRef(null);
  const mergedTW = { ...DEFAULT_TW, ...tw };

  const handleKeyPress = (e) => {
    switch (e.which) {
      case 13:
      case 32:
        onChange(filterRef.current);
        break;
      default:
    }
  };

  const handleChange = (e) => {
    onChange(filterRef.current);
  };

  return (
    <StyledLabel
      tw={mergedTW}
      htmlFor={id}
      tabIndex="0"
      onKeyPress={handleKeyPress}
      value={value}
    >
      <HiddenCheckbox
        {...props}
        onChange={handleChange}
        tw={mergedTW}
        type="checkbox"
        tabIndex="-1"
      />
      <CustomCheckbox
        tw={mergedTW}
        className="checkbox-custom"
        fg={fg}
        bg={bg}
        fg_checked={fgChecked}
        bg_checked={bgChecked}
        ref={filterRef}
      />
      <span>{label}</span>
    </StyledLabel>
  );
};

export default Checkbox;
