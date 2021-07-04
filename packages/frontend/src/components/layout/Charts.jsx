import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {full, allC, nMP, aL, aR, tC} from "../../scss/alignments";
import cn from "classnames";

import Card from "../elements/Card/Card";
import Container from "../elements/Card/Container";
import Section from "../elements/Card/Section";
import Field from "../elements/Card/Field";

import Doughnut from "../../assets/images/Doughnut.svg";
import ProgressBar from "../../assets/images/ProgressBar.svg";

import Button from "../elements/Buttons/SubmitButton";

const Charts = () => {
return (
    <React.Fragment>
        <Row className={cn('mt-5', 'pt-5', full, nMP, aL)}>
            <Card doughnut>
                <div className={cn(full, nMP, tC)}>
                    <div className={cn('pt-4', 'doughnut-img', full, nMP, allC)}>
                        <img src={Doughnut} alt="Doughnut" />
                    </div>
                    <div className={cn('pt-2', full, nMP, tC)}>
                        <p className={cn(full, nMP, 'text-white', 'text-center', 'bold', 'roboto', 'text-size-15')}>4 hrs 3 mins left before bucket transfer</p>
                        <p className={cn(full, nMP, 'text-white', 'text-center', 'regular', 'roboto-mono', 'text-size-20')}>Current Bucket ID: 12</p>
                    </div>
                </div>
                
            </Card>
        </Row>
        <Row className={cn('pt-3', full, nMP, aL)}>
            <Card progress>
            <div className={cn(full, nMP, tC)}>
            <div className={cn('pt-4', 'progress=img', full, nMP, allC)}>
                <img src={ProgressBar} alt="ProgressBar" className={cn('progress-img')} />
            </div>
            <div className={cn('pt-1', full, nMP, tC)}>
                <p className={cn(full, nMP, 'text-white', 'text-center', 'bold', 'roboto-mono', 'text-size-30')}>80%</p>
                <p className={cn(full, nMP, 'text-white', 'text-center', 'regular', 'roboto', 'text-size-15')}>Of the transfer threshold has been met</p>
                
            </div>
            </div>
            </Card>
           
        </Row>
    </React.Fragment>

    )
}

export default Charts;