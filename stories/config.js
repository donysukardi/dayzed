import { configure, storiesOf } from '@storybook/react';
import React from 'react';
import { css } from 'glamor';

import Single from './examples/single';
import Multi from './examples/multi';
import MinMax from './examples/minMax';
import MonthsToDisplay from './examples/monthsToDisplay';
import Interesting from './examples/interestingLayout';
import Range from './examples/range';

css.global('html, body', {
  padding: 0,
  fontFamily: 'sans-serif',
  fontSize: '16px'
});
css.global('html { box-sizing: border-box }');
css.global('*, *:before, *:after { box-sizing: inherit }');

function loadStories() {
  storiesOf('Examples', module)
    .add('Single Date Selection', () => <Single />)
    .add('Multi Date Selection', () => <Multi />)
    .add('Min and Max Date', () => <MinMax />)
    .add('Display Multiple Months', () => <MonthsToDisplay />)
    .add('Range', () => <Range />)
    .add('Interesting Layout', () => <Interesting />);
}

configure(loadStories, module);
