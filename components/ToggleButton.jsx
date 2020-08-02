import { colors } from '../global/base';
const selectIcon = '../static/assets/menu-selected.svg';

const ToggleButton = props => {
  const { selected, item, onClick } = props;

  function handleClick(button) {
    button.blur();
    onClick(item.text);
  }

  return (
    <>
      <button onClick={e => handleClick(e.target)}>{item.text}</button>
      <img
        src={selectIcon}
        alt="selected"
        className={selected ? 'selected' : 'notSelected'}
      />
      <style>{`
        button {
          flex: 1;
          text-decoration: none;
          color: ${colors.menuColor.primary};
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
        }

        .selected {
          position: absolute;
          bottom: 5px;
        }
        .notSelected {
          display: none;
        }
`}</style>
    </>
  );
};

export default ToggleButton;
