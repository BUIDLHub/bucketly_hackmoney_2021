import { useEagerConnect, useInactiveListener } from './hooks';
import cn from "classnames";
import './scss/style.scss';
// import {alignments as align} from './scss/alignments';

import Header from "./components/layout/Header";
import Body from "./components/layout/Body";

import NavTabs from "./components/elements/Tabs/NavTabs";

function App() {
    const triedEager = useEagerConnect();
    useInactiveListener(!triedEager);

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
