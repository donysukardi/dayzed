import React from 'react';
import styled, { css } from 'styled-components';

const Calendar = styled.div`
  margin: 0 auto;
  font-family: sans-serif;
  padding: 1.5rem;
`;

const MonthsWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const NavBar = styled.div``;

const NavBarPrevious = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const NavBarNext = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const NavButton = styled.button`
  background: transparent;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.5);
  border-color: rgba(0, 0, 0, 0.5);
  & > svg {
    fill: currentColor;
    vertical-align: middle;
  }
  &:hover,
  &:active,
  &:focus {
    border-color: rgba(0, 0, 0, 0.75);
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

const Month = styled.div`
  max-width: 800;
  display: table;
  border-collapse: collapse,
  border-spacing: 0;
  & + & {
    margin-left: 1rem
  }
`;

const Caption = styled.div`
  padding: 0 0.5rem;
  display: table-caption;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.15rem;
  font-weight: 500;
  line-height: 31px;
`;

const cellStyle = css`
  height: 48px;
  width: 48px;
`;

const Weekdays = styled.div`
  display: table-header-group;
`;

const WeekdaysRow = styled.div`
  display: table-row;
  margin: 1.5rem 0;
`;

const Weekday = styled.div`
  ${cellStyle} display: table-cell;
  font-size: 0.875em;
  text-align: center;
  color: #8b9898;
`;

const Body = styled.div`
  display: table-row-group;
`;

const Week = styled.div`
  display: table-row;
`;

const dayStyle = css`
  border: none;
  vertical-align: middle;
  width: 100%;
  font-size: 1rem;
  margin: 8px 0;
`;

const Day = styled(
  ({ start, end, unavailable, today, currentMonth, inRange, ...rest }) => (
    <button {...rest} />
  )
)`
  ${cellStyle} ${dayStyle}

  position: relative;
  z-index: 0;

  &:before {
    opacity: 0;
    position: absolute;
    content: '';
    left: 8px;
    top: 8px;
    right: 8px;
    bottom: 8px;
    z-index: -1;
    border-radius: 50%;
  }

  ${({
    selected,
    unavailable,
    today,
    currentMonth,
    inRange,
    start,
    end,
    hovered
  }) => {
    let background = today ? 'cornflowerblue' : 'transparent';
    background = selected || inRange ? 'purple' : background;
    background = unavailable ? 'rgba(0, 0, 0, 0.125)' : background;

    let color = !currentMonth ? 'rgba(0, 0, 0, 0.25)' : 'inherit';
    color = selected || inRange ? 'white' : color;

    let shouldHighlight = start || end;
    let hoverBg = shouldHighlight ? 'red' : 'transparent';
    hoverBg = hovered ? 'rgba(255, 0, 0, 0.5)' : hoverBg;

    return css`
      background: ${background};
      color: ${color};
      border-top-left-radius: ${start ? '50%' : '0'};
      border-bottom-left-radius: ${start ? '50%' : '0'};
      border-top-right-radius: ${end ? '50%' : '0'};
      border-bottom-right-radius: ${end ? '50%' : '0'};
      &:before {
        opacity: ${shouldHighlight ? 1 : 0};
        background-color: ${hoverBg};
      }
    `;
  }};
`;

const DayCell = styled.div`
  display: table-cell;
  &:first-child > ${Day} {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  &:last-child > ${Day} {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }
`;

const DayEmpty = styled.div`
  ${dayStyle} background: transparent;
`;

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
