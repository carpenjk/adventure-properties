import styled from 'styled-components';
import {
  getBackgroundColor,
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
} from 'themeweaver';

const Button = styled.button`
  flex: none;
  padding: 0;
  background-color: ${getBackgroundColor('button.expander', 'initial')};
  color: ${getColor('button.expander', 'inherit')};
  font-family: ${getFontFamily('button.expander', 'inherit')};
  font-weight: ${getFontWeight('button.expander', 'normal')};
  font-size: ${getFontSize('button.expander', '1.6rem')};
  letter-spacing: ${getLetterSpacing('button.expander', '0.025em')};

  background: none;
  border: none;
  cursor: pointer;
`;
const MoreButton = (props) => {
  const { expanded, onClick } = props;
  return <Button onClick={onClick}>{expanded ? '-' : '+'} More Filters</Button>;
};

export default MoreButton;
