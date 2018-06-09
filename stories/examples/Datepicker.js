import React from 'react';
import glamorous from 'glamorous';
import Dayzed from '../../src/index';
import ArrowKeysReact from 'arrow-keys-react';
import { monthNamesFull, weekdayNamesShort } from './calendarUtils';

let Calendar = glamorous.div({
  maxWidth: 800,
  margin: '0 auto',
  textAlign: 'center'
});

let Month = glamorous.div({
  display: 'inline-block',
  width: '50%',
  padding: '0 10px 30px',
  boxSizing: 'border-box'
});

const dayOfMonthStyle = {
  display: 'inline-block',
  width: 'calc((100% / 7) - 4px)', // make allowance for active border
  border: 'none',
  margin: '2px' // make allowance for active border
};

let DayOfMonth = glamorous.button(
  dayOfMonthStyle,
  ({ selected, unavailable, today, currentMonth }) => {
    let background = today ? 'cornflowerblue' : 'transparent';
    background = selected ? 'purple' : background;
    background = unavailable ? 'teal' : background;
    let color = !currentMonth ? 'rgba(0, 0, 0, 0.6)' : '';
    return { background, color };
  }
);

let DayOfMonthEmpty = glamorous.div(dayOfMonthStyle, {
  background: 'transparent'
});

let [sun, ...restOfWeek] = weekdayNamesShort;
let weekdayNamesShortMon = [...restOfWeek, sun];

class Datepicker extends React.Component {
  state = {
    offset: 0
  };

  constructor(props) {
    super(props);
    ArrowKeysReact.config({
      left: () => {
        this.getKeyOffset(-1);
      },
      right: () => {
        this.getKeyOffset(1);
      },
      up: () => {
        this.getKeyOffset(-7);
      },
      down: () => {
        this.getKeyOffset(7);
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this.setState({ offset: 0 });
    }
  }

  getKeyOffset(number) {
    const e = document.activeElement;
    const buttons = this.rootEl.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i] == e) {
        const newNodeKey = i + number;
        if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
          buttons[newNodeKey].focus();
        } else {
          buttons[0].focus();
        }
        break;
      }
    }
  }

  _handleOffsetChanged = offset => {
    this.setState({
      offset
    });
  };

  _setRootRef = ref => {
    this.rootEl = ref;
  };

  render() {
    let weekdayNames =
      this.props.firstDayOfWeek === 0
        ? weekdayNamesShort
        : weekdayNamesShortMon;

    return (
      <Dayzed
        date={this.props.date}
        onDateSelected={this.props.onDateSelected}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        selected={this.props.selected}
        monthsToDisplay={this.props.monthsToDisplay}
        firstDayOfWeek={this.props.firstDayOfWeek}
        fillAdjacentMonths={this.props.fillAdjacentMonths}
        offset={this.state.offset}
        onOffsetChanged={this._handleOffsetChanged}
        render={({
          calendars,
          getDateProps,
          getBackProps,
          getForwardProps
        }) => {
          if (calendars.length) {
            return (
              <Calendar innerRef={this._setRootRef} {...ArrowKeysReact.events}>
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
                  <Month key={`${calendar.month}${calendar.year}`}>
                    <div data-test="monthYear">
                      {monthNamesFull[calendar.month]} {calendar.year}
                    </div>
                    {weekdayNames.map((weekday, idx) => (
                      <DayOfMonthEmpty
                        key={`${calendar.month}${calendar.year}${weekday}`}
                        {...(idx === 0
                          ? { 'data-test': 'firstDayOfWeek' }
                          : {})}
                      >
                        {weekday}
                      </DayOfMonthEmpty>
                    ))}
                    {calendar.weeks.map((week, windex) =>
                      week.map((dateObj, index) => {
                        let key = `${calendar.month}${
                          calendar.year
                        }${windex}${index}`;
                        if (!dateObj) {
                          return <DayOfMonthEmpty key={key} />;
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
                          <DayOfMonth
                            key={key}
                            {...getDateProps({
                              dateObj
                            })}
                            selected={selected}
                            unavailable={!selectable}
                            currentMonth={!prevMonth && !nextMonth}
                            today={today}
                          >
                            {selectable ? date.getDate() : 'X'}
                          </DayOfMonth>
                        );
                      })
                    )}
                  </Month>
                ))}
              </Calendar>
            );
          }
          return null;
        }}
      />
    );
  }
}

export default Datepicker;
