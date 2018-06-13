import glamorous from 'glamorous';

const Calendar = glamorous.div({
  margin: '0 auto',
  fontFamily: 'sans-serif',
  padding: '1.5rem'
});

const MonthsWrapper = glamorous.div({
  position: 'relative',
  display: 'inline-flex'
});

const NavBar = glamorous.div({});

const NavBarPrevious = glamorous.div({
  position: 'absolute',
  left: 0,
  top: 0
});

const NavBarNext = glamorous.div({
  position: 'absolute',
  right: 0,
  top: 0
});

const NavButton = glamorous.button({
  background: 'transparent',
  borderRadius: '2px',
  color: 'rgba(0, 0, 0, 0.5)',
  borderColor: 'rgba(0, 0, 0, 0.5)',
  '> svg': {
    fill: 'currentColor'
  },
  '&:hover, &:active, &:focus': {
    borderColor: 'rgba(0, 0, 0, 0.75)'
  }
});

const Month = glamorous.div({
  maxWidth: 800,
  display: 'table',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  '& + &': {
    marginLeft: '1rem'
  }
});

const Caption = glamorous.div({
  padding: '0 .5rem',
  display: 'table-caption',
  textAlign: 'center',
  marginBottom: '1rem',
  fontSize: '1.15rem',
  fontWeight: '500',
  lineHeight: '31px'
});

const cellStyle = {
  padding: '.75rem'
};

const Weekdays = glamorous.div({
  display: 'table-header-group'
});

const WeekdaysRow = glamorous.div({
  display: 'table-row',
  margin: '1.5rem 0'
});

const Weekday = glamorous.div(cellStyle, {
  display: 'table-cell',
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
  border: 'none',
  verticalAlign: 'middle',
  width: '100%',
  fontSize: '1rem'
};

const Day = glamorous.button(
  cellStyle,
  dayStyle,
  ({ selected, unavailable, today, currentMonth, inRange, start, end }) => {
    let background = today ? 'cornflowerblue' : 'transparent';
    background = selected || inRange ? 'purple' : background;
    background = unavailable ? 'rgba(0, 0, 0, 0.125)' : background;

    let color = !currentMonth ? 'rgba(0, 0, 0, 0.6)' : '';
    color = selected || inRange ? 'white' : color;

    return {
      background,
      color,
      ...(start
        ? { borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px' }
        : {}),
      ...(end
        ? { borderTopRightRadius: '16px', borderBottomRightRadius: '16px' }
        : {})
    };
  }
);

const DayEmpty = glamorous.div(dayStyle, {
  background: 'transparent'
});

export {
  Calendar,
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
};
