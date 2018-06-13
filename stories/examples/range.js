import React from 'react';
import glamorous from 'glamorous';
import { RangeDatePicker } from '../../src/index';
import { monthNamesFull, weekdayNamesShort } from './calendarUtils';
import Calendar from './Calendar';

class RangeDatepicker extends React.Component {
  render() {
    return (
      <RangeDatePicker
        {...this.props}
        render={renderProps => (
          <Calendar weekdayNames={weekdayNamesShort} {...renderProps} />
        )}
      />
    );
  }
}

class Range extends React.Component {
  state = {
    selectedDates: [],
    date: new Date('05/01/2018')
  };

  _handleOnChange = selectedDates => {
    this.setState({ selectedDates });
  };

  render() {
    let { selectedDates, date } = this.state;
    return (
      <div>
        <RangeDatepicker
          date={date}
          selected={this.state.selectedDates}
          onChange={this._handleOnChange}
          monthsToDisplay={2}
        />
        {selectedDates.length === 2 && (
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <p>Selected:</p>
            <p
            >{`${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Range;
