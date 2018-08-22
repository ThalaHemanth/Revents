import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import App from './app/layout/App';
import ScrollToTop from './app/common/util/ScrollToTop';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './app/store/configureStore';
import { loadEvents } from './features/event/eventActions';

const store = configureStore();
store.dispatch(loadEvents());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
