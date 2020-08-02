import { useRef } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  color: var(--lightText);
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

  &:checked ~ .checkbox-custom {
    background-color: var(--primary);
    border-radius: 5px;
    -webkit-transform: rotate(0deg) scale(1);
    -ms-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
    opacity: 1;
    border: 2px solid var(--primary);
  }

  &:checked ~ .checkbox-custom::after {
    -webkit-transform: rotate(45deg) scale(1);
    -ms-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
    opacity: 1;
    width: 0.31em;
    height: 0.68em;
    border: solid var(--globalWhite);
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
  background-color: transparent;
  border-radius: 5px;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  border: 2px solid var(--primary);
  &::focus {
    border: 2px solid var(--secondary);
  }
  &::after {
    content: '';
    height: 0px;
    width: 0px;
    border-radius: 5px;
    border: solid var(--secondary);
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
  const { id, name, label, mobileBreakpoint } = props;
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
        checked={get(id) || false}
        onChange={handleCheckFilterChange}
      />
      <CustomCheckbox
        id={id}
        name={name}
        className="checkbox-custom"
        tabIndex="0"
        mobileBreakpoint={mobileBreakpoint}
        onKeyPress={handleKeyPress}
        ref={filterRef}
      />
      <span>{label}</span>
    </StyledLabel>
  );
};

export default Checkbox;
