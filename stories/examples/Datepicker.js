import React from 'react';
import glamorous from 'glamorous';
import { DatePicker, MultiDatePicker } from '../../src/index';
import { monthNamesFull, weekdayNamesShort } from './calendarUtils';

const Calendar = glamorous.div({
  maxWidth: 800,
  margin: '0 auto',
  fontFamily: 'sans-serif'
});

const Month = glamorous.div({
  display: 'table',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  userSelect: 'none',
  margin: '0 1rem',
  marginTop: '1rem'
});

const Caption = glamorous.div({
  padding: '0 .5rem',
  display: 'table-caption',
  textAlign: 'left',
  marginBottom: '.5rem',
  fontSize: '1.15rem',
  fontWeight: '500'
});

const Weekdays = glamorous.div({
  marginTop: '1rem',
  display: 'table-header-group'
});

const WeekdaysRow = glamorous.div({
  display: 'table-row'
});

const Weekday = glamorous.div({
  display: 'table-cell',
  padding: '.5rem',
  fontSize: '.875em',
  textAlign: 'center',
  color: '#8b9898'
});

const Body = glamorous.div({
  display: 'table-row-group'
});

const Week = glamorous.div({
  display: 'table-row'
});

const DayCell = glamorous.div({
  display: 'table-cell'
});

const dayStyle = {
  padding: '.5rem',
  border: 'none',
  verticalAlign: 'middle',
  width: '100%'
};

const Day = glamorous.button(
  dayStyle,
  ({ selected, unavailable, today, currentMonth }) => {
    let background = today ? 'cornflowerblue' : 'transparent';
    background = selected ? 'purple' : background;
    background = unavailable ? 'teal' : background;
    let color = !currentMonth ? 'rgba(0, 0, 0, 0.6)' : '';
    color = selected ? 'white' : color;

    return { background, color };
  }
);

const DayEmpty = glamorous.div(dayStyle, {
  background: 'transparent'
});

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
