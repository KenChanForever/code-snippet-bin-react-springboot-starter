import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MainContainer from './containers/MainContainer';
import { store } from './store';
import '../less/app.less';
import 'antd/dist/antd.less';

ReactDOM.render((
  <Provider store={store}>
    <MainContainer />
  </Provider>
    ), document.getElementById('app'));

