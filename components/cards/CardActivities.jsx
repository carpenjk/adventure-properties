import styled from 'styled-components';

const StyledActivities = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
`;
const StyledActivity = styled.li`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.02em;
`;

const MAX_ACTIVITY_CHARS = 50;
const CardActivities = ({ activities }) => {
  let charCount = 0;

  return (
    <StyledActivities>
      {activities.map((activity, index) => {
        const MIN_CHARS = 5;
        // check for enough remaining chars
        if (MAX_ACTIVITY_CHARS - charCount < MIN_CHARS) {
          return <span />;
        }

        // check to see if it should be truncated
        // is last in list
        // or last based because overage on this activity
        // or last in list because not enough remaining after this one
        const isLastActivity = index === activities.length - 1;
        const remCharsBeforeSuffix =
          MAX_ACTIVITY_CHARS - (charCount + activity.length);
        const isLastDisplayed =
          isLastActivity || remCharsBeforeSuffix < MIN_CHARS + 2;

        let suffix = '';
        if (!isLastDisplayed) {
          suffix = ',';
        } else if (
          (isLastDisplayed && !isLastActivity) ||
          remCharsBeforeSuffix - activity.length < 0
        ) {
          suffix = '...';
        }

        // increment count
        const othChars = !isLastDisplayed ? suffix.length + 1 : suffix.length;
        const newChars = activity.length + othChars;
        charCount += newChars;

        const displayedActivity =
          charCount <= MAX_ACTIVITY_CHARS
            ? activity
            : activity.slice(
                0,
                activity.length - (charCount - MAX_ACTIVITY_CHARS - 1)
              );

        return (
          <StyledActivity key={activity}>
            <span>{`${displayedActivity}${suffix}`}</span>
            {!isLastDisplayed && <span>&nbsp;</span>}
          </StyledActivity>
        );
      })}
    </StyledActivities>
  );
};

export default CardActivities;
