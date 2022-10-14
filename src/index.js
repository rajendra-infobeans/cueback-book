import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/Store';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';


ReactDOM.render(
  // <React.StrictMode>
   <Provider store={store}>
    <Router>
    <App />
    </Router>
   </Provider>,
  document.getElementById('root')
);
// export default LandingPage;