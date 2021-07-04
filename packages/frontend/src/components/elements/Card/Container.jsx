import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {full, allC, tCR, nMP} from "../../../scss/alignments";
import cn from "classnames";

import styles from "./Card.scss";

// Cards > Containers > Sections > Fields

const Container = (props) => {
    return (
        <Row className={cn(full, allC, nMP)}> {/* placement */}
            <div className={cn('container-styles', 'card-shadow', full, allC, nMP)}> {/* the section */}
                <div className={cn(full, tCR, 'px-3', 'py-3')}> {/* section content */}
                    {props.children}
                </div> 
            </div>
        </Row>
    )
}

export default Container;