import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, Router, hashHistory } from 'react-router'
import MediaQuery from 'react-responsive'
import 'antd/dist/antd.css'
import PCIndex from './js/component/pc_index';
import MobileIndex from './js/component/mobile_index'
import * as serviceWorker from './serviceWorker';

class Root extends React.Component {
  render () {
    return (
      <div>
        <MediaQuery minDeviceWidth={1224}>
          <PCIndex></PCIndex>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <MobileIndex></MobileIndex>
        </MediaQuery>
      </div>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
