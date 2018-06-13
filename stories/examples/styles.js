import glamorous from 'glamorous';

const Calendar = glamorous.div({
  maxWidth: 800,
  margin: '0 auto',
  fontFamily: 'sans-serif'
});

const Month = glamorous.div({
  display: 'table',
  borderCollapse: 'collapse',
  borderSpacing: 0,
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

export {
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
};
