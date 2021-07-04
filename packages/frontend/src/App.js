import React from "react";
import cn from "classnames";
import './scss/style.scss';
// import {alignments as align} from './scss/alignments';

import Header from "./components/layout/Header";
import Body from "./components/layout/Body";

import NavTabs from "./components/elements/Tabs/NavTabs";

function App() {
  return (
    <div className="App">
      <Header />
      <Body>
        <NavTabs />
      </Body>
    </div>
  );
}

export default App;
