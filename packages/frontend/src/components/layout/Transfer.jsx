import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {full, allC, nMP, aL, aR} from "../../scss/alignments";
import cn from "classnames";

import Card from "../elements/Card/Card";
import Container from "../elements/Card/Container";
import Section from "../elements/Card/Section";
import Field from "../elements/Card/Field";

import DERC20 from "../../assets/images/DERC20.svg";
import Unlock from "../../assets/images/unlock.svg";

import Button from "../elements/Buttons/SubmitButton";

const Transfer = () => {
return (
 <Card main>
     <Row className={cn(full, 'pt-3', nMP, aL)}>
     <p className={cn('text-white', 'regular', 'roboto', 'text-size-20', 'text-uppercase')}>Transfer This</p>
     </Row>
     <Container>
         <Section>
         <TokenAndAmtRow />
         </Section>
     </Container>
     <Row className={cn(full, 'pt-3', nMP, aL)}>
     <p className={cn('text-white', 'regular', 'roboto', 'text-size-20', 'text-uppercase')}>Total</p>
         </Row>
     <Container>
     <EstimatesRow />
     </Container>
     <Row className={cn(full, 'pt-3', nMP, allC)}> {/* Ideally this would be right aligned */}
     <Button text="Transfer" active />
     </Row>
 </Card>
)
}

export default Transfer;


const TokenAndAmtRow = () => {
return (
    <React.Fragment>
        <Row className={cn(full, 'py-1', nMP, allC)}>
        <Col xs="2" className={cn(full, nMP, allC)}>
            <Field input>
                <img src={DERC20} alt="DERC20" className={cn('derc20')} />
            </Field>
        </Col>
        <Col xs="3" className={cn(full, nMP, allC)}>
            <Field input>
                <p className={cn(full, nMP, 'text-white', 'bold', 'roboto', 'text-size-20', 'pl-1')}>DERC20</p>
                <p className={cn(full, nMP, 'text-light', 'regular', 'roboto', 'text-size-15', 'pl-1')}>Dummy ERC20</p>
            </Field>
            
        </Col>
        <Col xs="7" className={cn(full, nMP, allC)}>
            <Field input>
                <Row className={cn(full, nMP, allC)}>
                    <Col xs="7" className={cn(full, nMP, aL)}>
                        <p className={cn(full, nMP, 'text-white', 'regular', 'roboto', 'text-size-20', 'pl-1')}>Balance:</p>
                        <p className={cn(full, nMP, 'text-light', 'regular', 'roboto-mono', 'text-size-15', 'pl-1')}>10.00 DERC20</p>
                    </Col>
                    <Col xs="5" className={cn(full, nMP, aR)}>
                        {/* technically there'd be an input field here */}
                        <p className={cn(full, nMP, 'text-light', 'text-right', 'pr-1', 'bold', 'roboto-mono', 'text-size-20', aR)}>10 DERC20</p>
                    </Col>
                </Row>
                
            </Field>
        </Col>
        
    </Row>
    <Row className={cn(full, 'py-1', nMP, allC)}>
    <Col xs="6" className={cn(full, nMP, allC)} />
    <Col xs="6" className={cn(full, nMP, aR)}>
        <div className={cn(full, nMP, allC)}>
            <Col xs="4" className={cn(full, aR, nMP)}>
                <Field input>
                <img src={Unlock} alt="Unlock" className={cn(full, 'unlock')} />
                </Field>
            </Col>
            <Col xs="8" className={cn(full, aR, nMP)}>
                <Field input>
                <p className={cn(full, nMP, 'text-white', 'regular', 'roboto', 'text-size-15', 'pl-1')}>Approved Amount:</p>
                <p className={cn(full, nMP, 'text-light', 'regular', 'roboto-mono', 'text-size-15', 'pl-1')}>Infinite DERC20</p>
                </Field>
            </Col>
        </div>

    </Col>
        
        
    </Row>
    </React.Fragment>
    
)
}

// layout of 3 column fields inside the estimates section
const EstimatesRow = () => {
    return (
        <Row className={cn(full, 'py-1', nMP, allC)}>
            <EstimateField title="Estimated Today" amt="AMT" />
            <EstimateField title="Estimated Bucket Cost" amt="AMT" />
            <EstimateField title="Estimated Savings" amt="AMT" />
        </Row>
    )
}

// for the styling of the data title and amount
const EstimateField = ({title, amt}) => {
return (
    <Col xs="4" className={cn(full, nMP, aL)}>
        <Field data>
        {/* <div className={cn(full, 'px-1', nMP)}> */}
                <Row className={cn(full, nMP)}>
                    <p className={cn(nMP, 'roboto', 'text-size-15', 'regular', 'text-white', 'pl-1')}>{title}</p>
                
                </Row>
                <Row className={cn(full, nMP)}>
                    <p className={cn(full, nMP, 'roboto-mono', 'text-light', 'text-size-20', 'regular', 'pl-1')}>{amt}</p>
                </Row>
                {/* </div>     */}
        </Field>
            
    </Col>
)
}