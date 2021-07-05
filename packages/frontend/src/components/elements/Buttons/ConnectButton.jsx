import React, { useState, useContext } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../../util';
// import { WalletContext } from "../../providers/wallet"; // add the providers context
import cn from "classnames";
import {full, allC, tCR, jC, aC, nMP, aR} from "../../../scss/alignments";
import {Row, Col} from 'reactstrap';
import ButtonText from "../Text/ButtonText";
import styles from "./Buttons.scss";

import Address from "../Web3/Address";
import NetworkStatus from "../Web3/NetworkStatus"; 
import Balance from "../Web3/Balance";

// const providerOptions = {};

// const web3Modal = new Web3Modal({
//   network: "kovan", // optional
//   cacheProvider: true, // optional
//   providerOptions // required
// });

const ConnectButton = () => {

  const { activate, active } = useWeb3React();


    // const account = [0x0e75f6E1a3C8CaACD9Ee46FB5E54883AAAF58566];

    // const { account, setWallet } = useContext(WalletContext); // add this back in
   
    // const [provider, setProvider] = useState(null); // add this back in, eslint-disable-line no-unused-vars


    // add this back in
    // async function connect() {
    //     try {
    //       const providerResponse = await web3Modal.connect();
    //       const web3 = new Web3(providerResponse);
    //       setProvider(providerResponse);
    //       setWallet(web3);
    //       history.push('/dashboard');
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }

    // const connected = account && injected;
  

    // const className = account ? cn("get-started-btn") : "btn btn-primary my-2 my-sm-0";
    // const buttonText = account ? "Get Started" : "Connect";

    return !active ? (
      <React.Fragment>
        {/* DISCONNECTED */}
            <div className={cn('pt-1', tCR, full)}>
                  
                <div className={cn('connect-button', 'connect-button-padding', 'clickable', jC, aC, allC)} to="/dashboard">
                      <div className={cn(allC, full)} onClick={() => activate(injected)}>
                            <Row className={cn(full, nMP, allC)}>
                                <Col xs="10" className={cn(full, nMP)}>
                                  <ButtonText text="Connect Wallet" className={cn(allC)} />
                                </Col>
                                <Col xs="2" className={cn(full, nMP)}>
                                <div className={cn(full, 'pb-3', nMP, aR)}>
                                <NetworkStatus /> 
                            </div>
                                </Col>
                            </Row>
                      </div>
                </div>

            </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
            {/* CONNECTED */}
        <div className={cn('connect-button', 'connect-button-padding', 'pb-2', jC, aC, allC)} to="/dashboard">
           
        <div className={cn('text-white')}>
                  <Address/>
                    </div>
                 <NetworkStatus />
                 <div className={cn('pt-1', 'text-white')}>
                     <Balance />  
                 </div>
        </div>
      </React.Fragment>
    )

};

export default ConnectButton;