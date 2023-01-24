import styled from 'styled-components';

export const StyledTechnologies = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 32px 18px;
  background-color: ${(props) => props.theme.colors.indigo3};
  border-top: 1px solid ${(props) => props.theme.colors.indigo6};

  > * {
    margin-bottom: 8px;
  }
  > *:last-child {
    margin-bottom: 0;
  }
`;
