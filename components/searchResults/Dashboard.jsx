import styled from 'styled-components';
import Menu from './Menu';
import Message from './Message';

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Dashboard = ({ message }) => (
  <StyledDashboard>
    <Message message={message} />
    <Menu />
  </StyledDashboard>
);

export default Dashboard;
