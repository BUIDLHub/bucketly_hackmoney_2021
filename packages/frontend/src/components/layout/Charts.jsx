import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import ProgressBar from '../elements/ProgressBar';
import { full, allC, nMP, aL, aR, tC } from "../../scss/alignments";
import cn from "classnames";

import Card from "../elements/Card/Card";
// import Container from "../elements/Card/Container";
// import Section from "../elements/Card/Section";
// import Field from "../elements/Card/Field";

// import ProgressBar from "../../assets/images/ProgressBar.svg";

import Button from "../elements/Buttons/SubmitButton";

const Charts = () => {
    let chartPercentage = 50;
    return (
        <React.Fragment>
            <Row className={cn('mt-5', 'pt-5', full, nMP, aL)}>
                <Card doughnut>
                    <div className={cn(full, nMP, tC)}>
                        <div className={cn('pt-2', 'doughnut-img', full, nMP, allC)}>
                            <CircularProgressbar value={chartPercentage} text={`${chartPercentage}%`} />
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
                    <div className={''}>
                        <div className={cn('pt-4', 'pb-4')}>
                            <ProgressBar />
                        </div>
                        <div className={cn('pt-1', full, nMP, tC)}>
                            <p className={cn(full, nMP, 'text-white', 'text-center', 'bold', 'roboto-mono', 'text-size-30')}>50%</p>
                            <p className={cn(full, nMP, 'text-white', 'text-center', 'regular', 'roboto', 'text-size-15')}>Of the transfer threshold has been met</p>
                        </div>
                    </div>
                </Card>

            </Row>
        </React.Fragment>

    )
}

export default Charts;