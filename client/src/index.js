import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import App from './Conponents/App/App';
import store from "./redux/store";
import './index.css';


import { makeServer } from "./server";

makeServer({ environment: "development" })



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
	</Provider>
);

