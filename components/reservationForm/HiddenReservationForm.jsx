import useReservation from './UseReservation';
import ActionButton from '../base/ActionButton';

const HiddenReservationForm = ({ onSubmit, propID }) => {
  const {
    arriveDateVal,
    deptartDateVal,
    numGuests,
    userName,
  } = useReservation();

  return (
    <form onSubmit={onSubmit}>
      <input name="hd_user" type="hidden" value={userName} />
      <input name="hd_Id" type="hidden" value={propID} />
      <input name="hd_st_date" type="hidden" value={arriveDateVal} />
      <input name="hd_end_date" type="hidden" value={deptartDateVal} />
      <input name="hd_guestCount" type="hidden" value={numGuests} />
      <ActionButton type="submit" variant="reserve" onClick={onSubmit}>
        Reserve
      </ActionButton>
    </form>
  );
};

export default HiddenReservationForm;
