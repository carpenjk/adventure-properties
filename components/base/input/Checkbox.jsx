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
  color: ${getColor('checkbox.searchBar', 'inherit')};
  background-color: ${getBackgroundColor('checkbox.searchBar', 'initial')};
  font-family: ${getFontFamily('checkbox.searchBar', 'inherit')};
  font-weight: ${getFontWeight('checkbox.searchBar', 'normal')};
  font-size: ${getFontSize('checkbox.searchBar', '1.6rem')};
  letter-spacing: ${getLetterSpacing('checkbox.searchBar', '0.025em')};
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
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
    border-radius: ${getBorderRadius('checkbox.searchBar', '5px')};
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
  border-radius: ${getBorderRadius('checkbox.searchBar', '5px')};
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

const Checkbox = (props) => {
  const { id, name, label, fg, bg, fg_checked, bg_checked } = props;
  const { set, get } = props.valueFunctions;
  const filterRef = useRef(null);

  const handleCheckFilterChange = (e) => {
    const { id } = e.target;
    set(id);
  };

  const handleKeyPress = (e) => {
    const { id } = e.target;
    switch (e.which) {
      case 13:
      case 32:
        set(id);
    }
  };
  return (
    <StyledLabel htmlFor={id}>
      <HiddenCheckbox
        id={id}
        name={name}
        type="checkbox"
        tabIndex="-1"
        fg={fg}
        bg={bg}
        fg_checked={fg_checked}
        bg_checked={bg_checked}
        checked={get(id) || false}
        onChange={handleCheckFilterChange}
      />
      <CustomCheckbox
        id={id}
        name={name}
        className="checkbox-custom"
        fg={fg}
        bg={bg}
        fg_checked={fg_checked}
        bg_checked={bg_checked}
        tabIndex="0"
        onKeyPress={handleKeyPress}
        ref={filterRef}
      />
      <span>{label}</span>
    </StyledLabel>
  );
};

export default Checkbox;
