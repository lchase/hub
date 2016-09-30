import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

import AdminLTETemplate from './components/index';

require('../assets/style/main.less');

render(
  <AdminLTETemplate />
  , document.getElementById('app')
);