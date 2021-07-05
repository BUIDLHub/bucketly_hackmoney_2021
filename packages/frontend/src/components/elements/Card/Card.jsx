import React from 'react';
import {full, allC, nMP, tC} from "../../../scss/alignments";
import cn from "classnames";

import "./Card.scss";

// Cards > Containers > Sections > Fields

const Card = (props) => {

    let type;

    if (props.main) {
        type = "main-card";
    }

    if (props.doughnut) {
        type = "doughnut-card";
    }

    if (props.progress) {
        type = "progress-card";
    }


    return (
        <div className={cn('card-styles', type, 'card-shadow', full, tC, nMP)}> {/* the card */}
    <div className={cn(full, 'px-3', 'py-3')}> {/* card content */}
    {props.children}
    </div> 
        </div>
    )
}

export default Card;