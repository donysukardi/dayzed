import React from 'react';
import styled, { css } from 'styled-components';
import { DatePicker } from '../../src/index';
import { monthNamesShort, weekdayNamesShort } from './calendarUtils';

let Calendar = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-size: 16;
  padding-top: 30;
`;

let Controls = styled.div`
  margin: 0 auto;
  width: 50%;
`;

let ControlButton = styled.button`
  width: 25%;
  background: #000;
  padding: 10px;
  color: #fff;
  border: none;
  font-size: 16px;
  &:disabled {
    color: #4d4d4d;
  }
`;

let MonthYear = styled.div`
  writing-mode: vertical-rl;
  text-orientation: upright;
  display: inline-block;
  vertical-align: middle;
  letter-spacing: 3px;
  color: #c1c1c1;
  padding: 0 10px;
`;

let Month = styled.div`
  display: inline-block;
  width: 50%;
  background: #e1e1e1;
  padding: 10px;
  box-sizing: border-box;
  vertical-align: middle;
`;

const dayOfMonthStyle = css`
  display: inline-block;
  width: calc(100% / 7);
  border: none;
  font-size: 16px;
  background: transparent;
`;

let DayOfMonth = styled.div`
  ${dayOfMonthStyle} ${({ selected, unavailable, today }) => {
    let background = today ? 'cornflowerblue' : 'transparent';
    background = selected ? 'purple' : background;
    let color = (selected || today) && '#fff';
    color = unavailable ? '#9b9b9b' : color;

    return `
      background: ${background};
      color: ${color};
    `;
  }};
`;

let WeekdayName = styled.div`
  ${dayOfMonthStyle} background: transparent;
  padding-bottom: 10px;
  color: #fff;
`;

let DayOfMonthEmpty = styled(WeekdayName)``;

class Datepicker extends React.Component {
  render() {
    return (
      <DatePicker
        {...this.props}
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
                <Controls>
                  <ControlButton {...getBackProps({ calendars, offset: 12 })}>
                    {'<<'}
                  </ControlButton>
                  <ControlButton {...getBackProps({ calendars })}>
                    {'<'}
                  </ControlButton>
                  <ControlButton {...getForwardProps({ calendars })}>
                    {'>'}
                  </ControlButton>
                  <ControlButton
                    {...getForwardProps({ calendars, offset: 12 })}
                  >
                    {'>>'}
                  </ControlButton>
                </Controls>
                {calendars.map((calendar, i) => (
                  <div key={`${calendar.month}${calendar.year}`}>
                    <MonthYear>{monthNamesShort[calendar.month]}</MonthYear>
                    <Month>
                      <Div display="none">
                        {monthNamesShort[calendar.month]} {calendar.year}
                      </Div>
                      {i === 0 &&
                        weekdayNamesShort.map(weekday => (
                          <WeekdayName
                            key={`${calendar.month}${calendar.year}${weekday}`}
                          >
                            {weekday}
                          </WeekdayName>
                        ))}
                      {calendar.weeks.map((week, windex) =>
                        week.map((dateObj, index) => {
                          let key = `${calendar.month}${
                            calendar.year
                          }${windex}${index}`;
                          if (!dateObj) {
                            return <DayOfMonthEmpty key={key} />;
                          }
                          let { date, selected, selectable, today } = dateObj;
                          return (
                            <DayOfMonth
                              key={key}
                              {...getDateProps({ dateObj })}
                              selected={selected}
                              unavailable={!selectable}
                              today={today}
                            >
                              {selectable ? date.getDate() : 'X'}
                            </DayOfMonth>
                          );
                        })
                      )}
                    </Month>
                    <MonthYear>{calendar.year}</MonthYear>
                  </div>
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

class Single extends React.Component {
  state = {
    selectedDate: null
  };

  _handleOnChange = selected => {
    this.setState({ selectedDate: selected });
  };

  render() {
    let { selectedDate } = this.state;
    return (
      <div>
        <Datepicker
          selected={this.state.selectedDate}
          onChange={this._handleOnChange}
          minDate={new Date()}
          monthsToDisplay={3}
        />
        {this.state.selectedDate && (
          <div
            style={{
              paddingTop: 20,
              textAlign: 'center',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            <p>Selected:</p>
            <p>{`${selectedDate.toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Single;
