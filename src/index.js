import 'react-app-polyfill/ie11'; 
import 'react-app-polyfill/stable';

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./assets/css/style.css";
import "react-datepicker/dist/react-datepicker.css";



import 'jquery/dist/jquery.slim.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/css/fontsGoogleApi.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';

ReactDOM.render(<App></App>, document.getElementById("root"));
