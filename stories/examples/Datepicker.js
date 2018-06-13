import React from 'react';
import { DatePicker, MultiDatePicker } from '../../src/index';
import { monthNamesFull, weekdayNamesShort } from './calendarUtils';
import {
  Calendar,
  Month,
  Caption,
  Weekdays,
  WeekdaysRow,
  Weekday,
  Body,
  Week,
  DayCell,
  Day,
  DayEmpty
} from './styles';

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
      render={({
        calendars,
        getRootProps,
        getDateProps,
        getBackProps,
        getForwardProps
      }) => {
        if (calendars.length) {
          return (
            <Calendar {...getRootProps({ refKey: 'innerRef' })}>
              <div>
                <button
                  {...getBackProps({
                    calendars,
                    offset: 12,
                    'data-test': 'backYear'
                  })}
                >
                  {'<<'}
                </button>
                <button
                  {...getBackProps({ calendars, 'data-test': 'backMonth' })}
                >
                  Back
                </button>
                <button
                  {...getForwardProps({
                    calendars,
                    'data-test': 'forwardMonth'
                  })}
                >
                  Next
                </button>
                <button
                  {...getForwardProps({
                    calendars,
                    offset: 12,
                    'data-test': 'forwardYear'
                  })}
                >
                  {'>>'}
                </button>
              </div>
              {calendars.map(calendar => (
                <Month key={`${calendar.month}${calendar.year}`} role="grid">
                  <Caption role="heading">
                    <div data-test="monthYear">
                      {monthNamesFull[calendar.month]} {calendar.year}
                    </div>
                  </Caption>
                  <Weekdays role="rowGroup">
                    <WeekdaysRow role="row">
                      {weekdayNames.map((weekday, idx) => (
                        <Weekday
                          key={`${calendar.month}${calendar.year}${weekday}`}
                          {...(idx === 0
                            ? { 'data-test': 'firstDayOfWeek' }
                            : {})}
                        >
                          {weekday}
                        </Weekday>
                      ))}
                    </WeekdaysRow>
                  </Weekdays>
                  <Body data-test="calendarDates" role="rowgroup">
                    {calendar.weeks.map((week, windex) => (
                      <Week role="row">
                        {week.map((dateObj, index) => {
                          let key = `${calendar.month}${
                            calendar.year
                          }${windex}${index}`;
                          if (!dateObj) {
                            return (
                              <DayCell key={key}>
                                <DayEmpty />
                              </DayCell>
                            );
                          }
                          let {
                            date,
                            selected,
                            selectable,
                            today,
                            prevMonth,
                            nextMonth
                          } = dateObj;
                          return (
                            <DayCell key={key}>
                              <Day
                                {...getDateProps({
                                  dateObj
                                })}
                                selected={selected}
                                unavailable={!selectable}
                                currentMonth={!prevMonth && !nextMonth}
                                today={today}
                                role="gridcell"
                              >
                                {selectable ? date.getDate() : 'X'}
                              </Day>
                            </DayCell>
                          );
                        })}
                      </Week>
                    ))}
                  </Body>
                </Month>
              ))}
            </Calendar>
          );
        }
        return null;
      }}
    />
  );
};

export default Datepicker;
