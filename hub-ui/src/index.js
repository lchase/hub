import React, { Component } from 'react';
import { render } from 'react-dom';

import AdminLTETemplate from './components/index';

require('../assets/style/main.less');

render(
  <AdminLTETemplate />
  , document.getElementById('app')
);