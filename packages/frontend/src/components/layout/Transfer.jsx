import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col } from 'reactstrap';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import { useL1Bucket } from '../../context/L1Bucket';
import { full, allC, nMP, aL, aR } from "../../scss/alignments";
import cn from "classnames";

import Card from "../elements/Card/Card";
import Container from "../elements/Card/Container";
import Section from "../elements/Card/Section";
import Field from "../elements/Card/Field";

import DERC20 from "../../assets/images/DERC20.svg";
import Unlock from "../../assets/images/unlock.svg";

import Button from "../elements/Buttons/SubmitButton";

import DERC20ABI from '../../ABI/ERC20.json';
import { addresses } from '../../util'

const Transfer = () => {
    const [DERC20, setDERC20] = useState({});
    const [dercBalance, setDercBalance] = useState('');
    const [dercAllowance, setDercAllowance] = useState('');

    const { account, library } = useWeb3React();
    // Get L1Bucket from context
    const { L1Bucket } = useL1Bucket();
   
    const { testERC20L1, bucketL1 } = addresses;

    const loadData = useCallback(async () => {
        if (library) {
            const signer = library?.getSigner()

            // DERC20 Token
            const dERC20Token = new ethers.Contract(testERC20L1, DERC20ABI, signer);
            setDERC20(dERC20Token);

            // Get Users DERC20 balance and save it in state
            const dercBal = await dERC20Token.balanceOf(account);
            setDercBalance(formatEther(dercBal.toString()))

            // Get Allowance
            const dercAllowance = await dERC20Token.allowance(account, bucketL1);
            setDercAllowance(formatEther(dercAllowance.toString()))
        }
    }, [testERC20L1, account, library, bucketL1])

    useEffect(() => {
        loadData()
    }, [account, loadData])

    return (
        <Card main>
            <Row className={cn(full, 'pt-3', nMP, aL)}>
                <p className={cn('text-white', 'regular', 'roboto', 'text-size-20', 'text-uppercase')}>Transfer This</p>
            </Row>
            <Container>
                <Section>
                    <TokenAndAmtRow dercBalance={dercBalance} dercAllowance={dercAllowance} />
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


const TokenAndAmtRow = ({ dercBalance, dercAllowance }) => {
    return (
        <React.Fragment>
            <Row className={cn(full, 'py-1', nMP, allC)}>
                <Col xs="2" className={cn(full, nMP, allC)}>
                    <Field input>
                        <img src={DERC20} alt="DERC20" className={cn('derc20')} />
                    </Field>
                </Col>
                <Col xs="3" className={cn(full, nMP, allC)}>
                    <Field input>
                        <p className={cn(full, nMP, 'text-white', 'bold', 'roboto', 'text-size-20', 'pl-1')}>DERC20</p>
                        <p className={cn(full, nMP, 'text-light', 'regular', 'roboto', 'text-size-15', 'pl-1')}>Dummy ERC20</p>
                    </Field>

                </Col>
                <Col xs="7" className={cn(full, nMP, allC)}>
                    <Field input>
                        <Row className={cn(full, nMP, allC)}>
                            <Col xs="7" className={cn(full, nMP, aL)}>
                                <p className={cn(full, nMP, 'text-white', 'regular', 'roboto', 'text-size-20', 'pl-1')}>Balance:</p>
                                <p className={cn(full, nMP, 'text-light', 'regular', 'roboto-mono', 'text-size-15', 'pl-1')}>{dercBalance} DERC20</p>
                            </Col>
                            <Col xs="5" className={cn(full, nMP, aR)}>
                                {/* technically there'd be an input field here */}
                                <p className={cn(full, nMP, 'text-light', 'text-right', 'pr-1', 'bold', 'roboto-mono', 'text-size-20', aR)}>{dercBalance} DERC20</p>
                            </Col>
                        </Row>

                    </Field>
                </Col>

            </Row>
            <Row className={cn(full, 'py-1', nMP, allC)}>
                <Col xs="6" className={cn(full, nMP, allC)} />
                <Col xs="6" className={cn(full, nMP, aR)}>
                    <div className={cn(full, nMP, allC)}>
                        <Col xs="4" className={cn(full, aR, nMP)}>
                            <Field input>
                                <img src={Unlock} alt="Unlock" className={cn(full, 'unlock')} />
                            </Field>
                        </Col>
                        <Col xs="8" className={cn(full, aR, nMP)}>
                            <Field input>
                                <p className={cn(full, nMP, 'text-white', 'regular', 'roboto', 'text-size-15', 'pl-1')}>Approved Amount:</p>
                                <p className={cn(full, nMP, 'text-light', 'regular', 'roboto-mono', 'text-size-15', 'pl-1')}>{dercAllowance} DERC20</p>
                            </Field>
                        </Col>
                    </div>

                </Col>


            </Row>
        </React.Fragment>

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
const EstimateField = ({ title, amt }) => {
    return (
        <Col xs="4" className={cn(full, nMP, aL)}>
            <Field data>
                {/* <div className={cn(full, 'px-1', nMP)}> */}
                <Row className={cn(full, nMP)}>
                    <p className={cn(nMP, 'roboto', 'text-size-15', 'regular', 'text-white', 'pl-1')}>{title}</p>

                </Row>
                <Row className={cn(full, nMP)}>
                    <p className={cn(full, nMP, 'roboto-mono', 'text-light', 'text-size-20', 'regular', 'pl-1')}>{amt}</p>
                </Row>
                {/* </div>     */}
            </Field>

        </Col>
    )
}