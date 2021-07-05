import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {full, allC, nMP} from "../../../scss/alignments";
import cn from "classnames";

import styles from "./Card.scss";

// Cards > Containers > Sections > Fields

const Section = (props) => {
    return (
        <Row className={cn(full, allC, nMP)}> {/* placement */}
            <div className={cn('section-styles', 'py-2', full, allC, nMP)}> {/* the field */}
                <div className={cn(full, 'px-3')}> {/* field content */}
                    {props.children}
                </div> 
            </div>
        </Row>
    )
}

export default Section;