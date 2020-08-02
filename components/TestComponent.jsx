import styled from 'styled-components';
import { useState } from 'react';
import withFilterGroup from './searchbar/WithFilterGroup';

const Button = styled.button`
  flex: none;
  background: var(--action);
  box-shadow: 0px 1px 2px rgba(116, 108, 108, 0.25);
  border-radius: 10px;

  color: var(--lightBackground);
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 1.8rem;

  display: flex;
  align-items: center;
  text-align: center;
  padding: 1.2rem;

  border: none;
  cursor: pointer;
`;
const SearchButton = () => {
  const [label, setLabel] = useState('Hello');

  const handleClick = (e) => {
    setLabel('World');
  };

  return (
    <Button key="btn" onClick={handleClick} className="search">
      {label}
    </Button>
  );
};

export default withFilterGroup(SearchButton);
