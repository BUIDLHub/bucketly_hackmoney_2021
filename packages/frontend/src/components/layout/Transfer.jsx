import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {full, allC, nMP, aL, aR} from "../../scss/alignments";
import cn from "classnames";

import Card from "../elements/Card/Card";
import Container from "../elements/Card/Container";
import Section from "../elements/Card/Section";
import Field from "../elements/Card/Field";


import Button from "../elements/Buttons/SubmitButton";

const Transfer = () => {
return (
 <Card>
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
    <Row className={cn(full, 'py-1', nMP, allC)}>
        <Col xs="2" className={cn(full, nMP, allC)}>
            <Field>
                <p>token</p>
            </Field>
        </Col>
        <Col xs="4" className={cn(full, nMP, allC)}>
            <Field>
            <p>Token Selector</p>
            </Field>
            
        </Col>
        <Col xs="6" className={cn(full, nMP, allC)}>
            <Field>
                <p>balance</p>
            </Field>
        </Col>
        
    </Row>
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
        <Field>
        {/* <div className={cn(full, 'px-1', nMP)}> */}
                <Row className={cn(full, nMP)}>
                    <p className={cn(nMP, 'roboto', 'text-size-15', 'regular')}>{title}</p>
                </Row>
                <Row className={cn(full, nMP)}>
                    <p className={cn(nMP, 'roboto-mono', 'text-size-20', 'regular')}>{amt}</p>
                </Row>
                {/* </div>     */}
        </Field>
            
    </Col>
)
}