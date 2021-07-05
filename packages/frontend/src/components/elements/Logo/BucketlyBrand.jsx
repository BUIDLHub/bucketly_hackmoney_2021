import React from 'react';
import logo from '../../../assets/images/bucketlywhite.svg';
import {lC, full, nMP, aL} from '../../../scss/alignments';
import cn from "classnames";
import { Row, Col } from 'reactstrap';
import styles from "./Logo.scss";

const LogoBlock = () => {
  return (
    <div
      className={cn(lC, full, nMP, 'clickable')}
    >
        <a href="https://github.com/BUIDLHub/bucketly_hackmoney_2021" rel="noopener noreferrer">
          <Row className={cn(full, nMP, aL)}>
<Col className={cn(full, nMP, aL)}>
<NavLogo />
</Col>
<Col className={cn(full, nMP, aL)}>
<NavLogoText />
</Col>
          </Row>
        
        </a>
    </div>
  );
};


const NavLogo = () => {
return (
<img className={cn(full, 'nav-logo')} src={logo} alt="logo" />
)
}

const NavLogoText = () => {
  return (
    <p className={cn('white', 'nav-logo-text')}>Bucketly</p>
  )
}



export default LogoBlock;
