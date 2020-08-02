import CalendarHeader from './CalendarHeader';
const Calendar = props => {
  const { showCalendar } = props;
  return (
    <div
      className={
        'calendar ' + (showCalendar ? 'calendar-show' : 'calendar-hidden')
      }
    >
      <CalendarHeader />
      <table>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
          </tr>
          <tr>
            <td>15</td>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <td>19</td>
            <td>20</td>
            <td>21</td>
          </tr>
          <tr>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
          </tr>
          <tr>
            <td>29</td>
            <td>30</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <style jsx>{`
        .calendar {
          position: relative;
          padding 1rem;

          flex-direction:column;
          background: #FFFFFF;
          border: 10px solid #F8F8F8;
        }
        .calendar-hidden {
          display: none;
        }
        .calendar-show {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
