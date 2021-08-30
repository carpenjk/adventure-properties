import styled from 'styled-components';
import {
  getBackgroundColor,
  getColor,
  getFontSize,
  getFontWeight,
  getFontFamily,
  getLetterSpacing,
} from 'themeweaver';

const Button = styled.button`
  flex: none;
  background-color: ${getBackgroundColor('button.search', 'red')};
  color: ${getColor('button.search', 'white')};
  font-family: ${getFontFamily('button.search', 'inherit')};
  font-weight: ${getFontWeight('button.search', 'bold')};
  font-size: ${getFontSize('button.search', '1.6rem')};
  letter-spacing: ${getLetterSpacing('button.search', '0.025em')};
`;
const SearchButton = () => (
  <Button className="search actionButton">Search</Button>
);

export default SearchButton;
