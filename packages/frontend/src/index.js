import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-circular-progressbar/dist/styles.css';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './util';
import { L1BucketProvider } from '../src/context/L1Bucket'
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <L1BucketProvider>
      <App />
      </L1BucketProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
