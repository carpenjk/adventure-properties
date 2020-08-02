//configs and global
import { colors } from '../../global/base';

//assets
const leftArrow = './static/assets/calendar/left-arrow.svg';
const rightArrow = './static/assets/calendar/right-arrow.svg';

const CalendarHeader = () => {
  return (
    <div className="calendarHeader">
      <button className="leftArrow">
        <img src={leftArrow} alt="left arrow" />
      </button>
      <div className="month">January 2020</div>
      <button className="rightArrow">
        <img src={rightArrow} alt="left arrow" />
      </button>
      <style jsx>{`
        .calendarHeader {
          position: relative;
          width: 100%;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .month {
          font-family: 'Poppins', sans-serif;
          font-weight: bold;
          font-size: 2rem;
          color: ${colors.pallette.lightText};
        }
        .leftArrow {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .rightArrow {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default CalendarHeader;
