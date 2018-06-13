import React from 'react';
import { monthNamesFull, weekdayNamesShort } from './calendarUtils';
import {
  Calendar as StyledCalendar,
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

const Calendar = ({
  calendars,
  getRootProps,
  getDateProps,
  getBackProps,
  getForwardProps,
  weekdayNames
}) =>
  !!calendars.length && (
    <StyledCalendar {...getRootProps({ refKey: 'innerRef' })}>
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
        <button {...getBackProps({ calendars, 'data-test': 'backMonth' })}>
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
                  {...(idx === 0 ? { 'data-test': 'firstDayOfWeek' } : {})}
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
    </StyledCalendar>
  );

export default Calendar;
