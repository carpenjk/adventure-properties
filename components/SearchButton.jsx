import { Fragment } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  flex: none;
  background: var(--action);
  color: var(--lightBackground);
`;
const SearchButton = () => {
  return <Button className="search actionButton">Search</Button>;
};

export default SearchButton;
