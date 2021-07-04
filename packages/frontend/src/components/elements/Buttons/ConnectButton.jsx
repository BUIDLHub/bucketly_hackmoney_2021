import React, { useState, useContext } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../../util';
// import { WalletContext } from "../../providers/wallet"; // add the providers context
import cn from "classnames";
import {full, allC, jC, aC} from "../../../scss/alignments";
import ButtonText from "../Text/ButtonText";
import styles from "./Buttons.scss";

const providerOptions = {};

const web3Modal = new Web3Modal({
  network: "kovan", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

const ConnectButton = () => {

  const { activate } = useWeb3React();


    const account = [0x0e75f6E1a3C8CaACD9Ee46FB5E54883AAAF58566];

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

    const className = account ? cn("get-started-btn") : "btn btn-primary my-2 my-sm-0";
    const buttonText = account ? "Get Started" : "Connect";

    return account ? (
      <React.Fragment>
        <div className={cn('connect-button', 'connect-button-padding', 'clickable', jC, aC, allC)} to="/dashboard">
            <div className={cn(allC, full)} onClick={() => activate(injected)}>>
                  {/* {account.slice(0, 6)+"..."+account.slice(account.length - 4, account.length)} */}
                  <ButtonText text="Connect Wallet" className={cn(allC)} />
            </div>
           
        </div>
      </React.Fragment>
    ) : (
      <button
        className={className}
        type="button"
        onClick={() => activate(injected)}>
      >
        {buttonText}
      </button>
    )

};

export default ConnectButton;