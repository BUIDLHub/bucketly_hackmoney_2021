import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {full, allC, nMP, tC} from "../../../scss/alignments";
import cn from "classnames";

import styles from "./Card.scss";

// Cards > Containers > Sections > Fields

const Field = (props) => {

let type;

    if (props.input) {
        type = "field-input";
    }

    if (props.data) {
        type = "field-data";
    }

    return (
        <Row className={cn(full, allC, nMP)}> {/* placement */}
            <div className={cn('field-styles', type, 'mx-1', 'py-1', full, allC, nMP)}> {/* the field */}
                <div className={cn(full, tC, 'px-1')}> {/* field content */}
                    {props.children}
                </div> 
            </div>
        </Row>
    )
}

export default Field;