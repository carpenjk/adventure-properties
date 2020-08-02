//react
import { useState } from 'react';

//configs and global

import InputBase from '../InputBase';

//components
import Calendar from './Calendar';

const InputDate = props => {
  const { input, width, spaceAfter } = props;
  const [showCalendar, toggleCalendar] = useState(false);

  function openCalendar(input) {
    toggleCalendar(true);
  }

  return (
    <div className="dateWrapper">
      <InputBase
        input={input}
        spaceAfter={spaceAfter}
        onClick={e => openCalendar(e.target)}
      />
      <Calendar showCalendar={showCalendar} />

      <style jsx>{`
        .dateWrapper {
          position: relative;
          width: ${width};

          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default InputDate;
