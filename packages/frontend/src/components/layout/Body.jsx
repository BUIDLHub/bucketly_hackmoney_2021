import React from "react";
import cn from "classnames";
import {noMarginPad, allCenter, full, topCenter} from "../../scss/alignments";
import { Row, Col } from "reactstrap";
import FAQs from "../elements/FAQs/FAQs";
import Charts from "./Charts";
import './layout.scss';

const Body = ({children}) => {
    return (
        <Row className={cn(full, noMarginPad, allCenter, 'h-100')}>
            <Col md="1" className={cn(noMarginPad, full)} />
            <Col md="2" className={cn(noMarginPad, full)}>
                <FAQs />
            </Col>
            <Col xs="12" md="5" lg="5" className={cn(noMarginPad, full, allCenter)}>
                <div className={cn('px-5', 'py-5', topCenter)}>
                {children}
                </div>
            </Col>
            <Col md="3" className={cn(noMarginPad, full)}>
                <Charts />
            </Col>
            <Col md="1" className={cn(noMarginPad, full)} />
        </Row>
    )
}

export default Body;