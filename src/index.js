import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/Store';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
// Import Lora font
import '@fontsource/lora/500.css';
import '@fontsource/lora/600.css';
// Import Inter Font
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';


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