import styled from 'styled-components';
import MenuContainer from './MenuContainer';
import Message from './Message';

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Dashboard = (props) => {
  const { message, error, children } = props;
  return (
    <StyledDashboard>
      <Message message={message} />
      <MenuContainer>{children}</MenuContainer>
    </StyledDashboard>
  );
};

export default Dashboard;
