import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {full, allC, nMP, tC} from "../../../scss/alignments";
import cn from "classnames";

import styles from "./Card.scss";

// Cards > Containers > Sections > Fields

const Card = (props) => {
    return (
        <div className={cn('card-styles', 'card-shadow', full, tC, nMP)}> {/* the card */}
    <div className={cn(full, 'px-3', 'py-3')}> {/* card content */}
    {props.children}
    </div> 
        </div>
    )
}

export default Card;