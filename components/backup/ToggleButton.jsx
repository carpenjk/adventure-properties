import { colors } from '../static/global/base';
import styled from 'styled-components';
const selectIcon = '../static/assets/menu-selected.svg';

const StyledButton = styled.button`
  flex: 1;
  text-decoration: none;
  color: ${colors.menuColor.primary};
  background: none;
  padding: 0;
  font-family: var(--menuFont);
  font-weight: bold;
  font-size: 1.8rem;
`;

const SelectIcon = styled.img`
  display: ${(props) => (props.showIndicator ? 'block' : 'none')};

  &.selected {
    position: absolute;
    bottom: 5px;
  }
  &.notSelected {
    display: none;
  }
`;

const ToggleButton = (props) => {
  const { selected, item, onClick, showIndicator } = props;

  function handleClick(button) {
    button.blur();
    onClick(item.text);
  }

  return (
    <React.Fragment>
      <StyledButton tabIndex="0" onClick={(e) => handleClick(e.target)}>
        {item.text}
      </StyledButton>
      <SelectIcon
        src={selectIcon}
        showIndicator={showIndicator}
        alt="selected"
        className={selected ? 'selected' : 'notSelected'}
      />
    </React.Fragment>
  );
};

export default ToggleButton;
