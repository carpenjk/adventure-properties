import styled from 'styled-components';
import MenuContainer from './MenuContainer';
import Message from './Message';

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Dashboard = (props) => {
  const { message, children } = props;
  return (
    <StyledDashboard>
      <MenuContainer>{children}</MenuContainer>
      <Message message={message} />
    </StyledDashboard>
  );
};

export default Dashboard;
