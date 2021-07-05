import React, {useState} from 'react';
import {lC, full, nMP, aL} from '../../../scss/alignments';
import cn from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import "./Tabs.scss";
import TabText from "../Text/TabText";

import Transfer from "../../layout/Transfer";
import Withdraw from "../../layout/Withdraw";
import Logs from "../../layout/Logs";

const NavTabs = (props) => {
    const [activeTab, setActiveTab] = useState('1');
  
    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
  
    return (
      <div className={cn(full, nMP)}>
        <Nav tabs>

            {/* Tab Buttons & Text*/}
          <NavItem>
            <NavLink
              className={cn({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            > 
              <TabText text="Transfer" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={cn({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              <TabText text="Withdraw" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={cn({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              <TabText text="Logs" />
            </NavLink>
          </NavItem>
        </Nav>

        {/* Content */}
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
            <Col xs="11">
                <TabSpacing />
                <Transfer />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col xs="11">
              <TabSpacing />
                <Withdraw />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
          <Col xs="11">
          <TabSpacing />
                <Logs />
              </Col>
          </TabPane>
        </TabContent>
      </div>
    );
  }


//   to separate the card from the tab content
  const TabSpacing = () => {
      return (
          <div className={cn('mt-5')} />
      )
  }
  
  export default NavTabs;