import React from 'react';
import { monthNamesFull, weekdayNamesShort } from './calendarUtils';
import {
  Calendar as StyledCalendar,
  MonthsWrapper,
  NavBar,
  NavBarPrevious,
  NavBarNext,
  NavButton,
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

const ArrowForward = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const ArrowBackward = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const ArrowNext = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M8 5v14l11-7z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const ArrowPrev = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M16 5v14L5 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

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
      <MonthsWrapper>
        <NavBar>
          <NavBarPrevious>
            <NavButton
              {...getBackProps({
                calendars,
                offset: 12,
                'data-test': 'backYear'
              })}
            >
              <ArrowBackward />
            </NavButton>
            <NavButton
              {...getBackProps({ calendars, 'data-test': 'backMonth' })}
            >
              <ArrowPrev />
            </NavButton>
          </NavBarPrevious>
          <NavBarNext>
            <NavButton
              {...getForwardProps({
                calendars,
                'data-test': 'forwardMonth'
              })}
            >
              <ArrowNext />
            </NavButton>
            <NavButton
              {...getForwardProps({
                calendars,
                offset: 12,
                'data-test': 'forwardYear'
              })}
            >
              <ArrowForward />
            </NavButton>
          </NavBarNext>
        </NavBar>
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
                <Week key={windex} role="row">
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
      </MonthsWrapper>
    </StyledCalendar>
  );

export default Calendar;
