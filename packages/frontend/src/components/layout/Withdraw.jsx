import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {full, allC, nMP, aL, aR} from "../../scss/alignments";
import cn from "classnames";

import Card from "../elements/Card/Card";
import Container from "../elements/Card/Container";
import Section from "../elements/Card/Section";
import Field from "../elements/Card/Field";

import DERC20 from "../../assets/images/DERC20.svg";

import Button from "../elements/Buttons/SubmitButton";

const Withdraw = () => {
return (
 <Card main>
     <Row className={cn(full, 'pt-3', nMP, aL)}>
     <p className={cn('text-white', 'regular', 'roboto', 'text-size-20', 'text-uppercase')}>Ready to Withdraw</p>
     </Row>
     <Container>
         <Section>
         <WithdrawTableRow />
         </Section>
     </Container>
     <Row className={cn(full, 'pt-3', nMP, allC)}> {/* Ideally this would be right aligned */}
     <Button text="Withdraw" active />
     </Row>
 </Card>
)
}

export default Withdraw;


const WithdrawTableRow = () => {
return (
    <Row className={cn(full, 'py-1', nMP, allC)}>
        <Col xs="2" className={cn(full, nMP, allC)}>
            <Field input>
                <img src={DERC20} alt="DERC20" className={cn('derc20')} />
            </Field>
        </Col>
        <Col xs="4" className={cn(full, nMP, allC)}>
            <Field input>

                <p className={cn(full, nMP, 'text-white', 'bold', 'roboto', 'text-size-20', 'pl-1')}>DERC20</p>
                <p className={cn(full, nMP, 'text-light', 'regular', 'roboto', 'text-size-15', 'pl-1')}>Dummy ERC20</p>

            </Field>
            
        </Col>
        <Col xs="6" className={cn(full, nMP, allC)}>
            <Field input>
            <Row className={cn(full, nMP, allC)}>
                    <Col xs="4" className={cn(full, nMP, aL)} />
                    <Col xs="8" className={cn(full, nMP, aR)}>
                        {/* technically there'd be an input field here */}
                        <p className={cn(full, nMP, 'text-white', 'text-right', 'pr-1', 'regular', 'roboto', 'text-size-15', aR)}>Transfered:</p>
                        <p className={cn(full, nMP, 'text-light', 'text-right', 'pr-1', 'bold', 'roboto-mono', 'text-size-20', aR)}>10 DERC20</p>
                    </Col>
                </Row>
            </Field>
        </Col>
        
    </Row>
)
}
