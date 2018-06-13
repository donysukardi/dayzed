import React from 'react';
import { DatePicker, MultiDatePicker } from '../../src/index';
import Calendar from './Calendar';
import { monthNamesFull, weekdayNamesShort } from './calendarUtils';

let [sun, ...restOfWeek] = weekdayNamesShort;
let weekdayNamesShortMon = [...restOfWeek, sun];

const Datepicker = props => {
  let weekdayNames = [...weekdayNamesShort];
  if (props.firstDayOfWeek > 0) {
    let weekdaysFromFront = weekdayNames.splice(0, props.firstDayOfWeek);
    weekdayNames = weekdayNames.concat(weekdaysFromFront);
  }

  const { multi, ...rest } = props;
  const DatePickerComp = multi ? MultiDatePicker : DatePicker;

  return (
    <DatePickerComp
      {...rest}
      render={renderProps => (
        <Calendar weekdayNames={weekdayNames} {...renderProps} />
      )}
    />
  );
};

export default Datepicker;
