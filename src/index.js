import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './Shoping_cart/css/style.css';
import './Shoping_cart/css/style.min.css';
//import App from './token_login/Token_auth';
//import App from './Blog/Route/Route';
//import App from './Shoping_cart/Index';
import App from './Shoping_cart/Route/Route';
import reportWebVitals from './reportWebVitals';

const CLIENT_ID = "901398140959-2elfuk16l10kafpjqc19i3tl22h1m8ak.apps.googleusercontent.com";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
