import styled from 'styled-components';

const Button = styled.button`
  flex: none;
  padding: 0;

  color: var(--lightText);
  font-family: var(--headerFont);
  font-style: normal;
  font-weight: normal;
  font-size: 1.6rem;
  letter-spacing: 0.025em;

  background: none;
  border: none;
  cursor: pointer;
`;
const MoreButton = (props) => {
  const { expanded, onClick } = props;
  return <Button onClick={onClick}>{expanded ? '-' : '+'} More Filters</Button>;
};

export default MoreButton;
