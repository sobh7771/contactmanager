import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

/**
 * `render`
 * required
 * it handles the rendering of ur component to the ui
 * it happens during the mounting and updating of ur component
 * u can not `setState` in render
 *
 *
 * `componentDidMount`
 * allows the use of `setState`
 *
 */
