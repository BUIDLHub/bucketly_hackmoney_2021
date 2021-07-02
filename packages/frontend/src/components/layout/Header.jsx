import React from "react";
import iconWhite from "../../assets/images/bucetklywhite.svg";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
// import ConnectButton from "../elements/ConnectButton";

const Header = () => {
    return (
<div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    )
}

export default Header;