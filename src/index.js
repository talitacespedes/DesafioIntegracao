import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ConsolidatedTable from './components/ConsolidatedTable';
import GeneralTable from './components/GeneralTable';

ReactDOM.render(
  <React.StrictMode>
    <ConsolidatedTable />
    <GeneralTable />
  </React.StrictMode>,
  document.getElementById('root')
);