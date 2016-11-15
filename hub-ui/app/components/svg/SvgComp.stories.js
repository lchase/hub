import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SvgComp from './SvgComp';

storiesOf('SvgComp', module)
  .add('Default', () => (
    <SvgComp />
  ))