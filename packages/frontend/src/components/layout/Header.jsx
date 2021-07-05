import React, { useLayoutEffect } from "react";
import iconWhite from "../../assets/images/bucketlywhite.svg";
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import LogoBlock from "../elements/Logo/BucketlyBrand";
import cn from "classnames";
import {lC, nMP, full, tCR} from "../../scss/alignments";
import ConnectButton from "../elements/Buttons/ConnectButton";
import style from './layout.scss';

import NavLink from "../elements/Text/Navlink";


const Header = () => {
    return (
    <div className={cn(full, 'top', 'nav-container')}>
      <Navbar className={cn('px-3', )} dark>
        <NavbarBrand href="/" className={cn(lC, nMP)}>
<LogoBlock />
        </NavbarBrand>
          <Nav navbar className={cn('ml-auto', tCR)}>
            <NavItem className={cn('pt-3')}>
              <NavLink href="#/" text="Support" />
            </NavItem>
            <NavItem className={cn('pt-3')}>
              <NavLink href="#" text="Docs"  />
            </NavItem>
            <NavItem>
                <ConnectButton />
            </NavItem>
          </Nav>
      </Navbar>
    </div>
    )
}

export default Header;