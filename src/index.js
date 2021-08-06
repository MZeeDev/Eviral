import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MoralisProvider } from "react-moralis";

const appId='TTxOqOgA9vSsj2z84WeDRi4i1iDgbo9kruLWqfxd';
const serverUrl='https://siixq6taugjh.moralis.io:2053/server';

ReactDOM.render(
  <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <App />
  </MoralisProvider>,
  document.getElementById('root')
);