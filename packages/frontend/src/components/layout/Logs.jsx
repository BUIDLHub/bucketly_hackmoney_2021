import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {full, allC, nMP, aL, aR} from "../../scss/alignments";
import cn from "classnames";

import Card from "../elements/Card/Card";
import Container from "../elements/Card/Container";
import Section from "../elements/Card/Section";
import Field from "../elements/Card/Field";


import Button from "../elements/Buttons/SubmitButton";

const Logs = () => {
return (
 <Card>
     <Row className={cn(full, 'pt-3', nMP, aL)}>
     <p className={cn('text-white', 'regular', 'roboto', 'text-size-20', 'text-uppercase')}>Your Logs</p>
     </Row>
     <LogRow />
     <LogRow />
     <Row className={cn(full, 'pt-3', nMP, aL)}>
     <p className={cn('text-white', 'regular', 'roboto', 'text-size-20', 'text-uppercase')}>All Logs</p>
     </Row>
     <LogRow />
     <LogRow />
     <LogRow />
     <LogRow />
     <LogRow />
 </Card>
)
}

export default Logs;


const LogRow = () => {
return (
    <Row className={cn(full, 'py-1', nMP, allC)}>
        <Container>
        <Col xs="2" className={cn(full, nMP, aL)}>
            <p>Txn ID</p>
            </Col>
            <Col xs="4" className={cn(full, nMP, aL)}>
<p>Etherscan Link</p>
            </Col>
            <Col xs="4" className={cn(full, nMP, aL)}>
<p>AMT TKN</p>
            </Col>
            <Col xs="2" className={cn(full, nMP, aL)}>
                <p>Status</p>
            </Col>

        </Container>
    </Row> 
)
}
