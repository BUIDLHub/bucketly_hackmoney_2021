import React, { useState } from "react";
import cn from "classnames";
import {full, allC, jC, aC} from "../../../scss/alignments";
import ButtonText from "../Text/ButtonText";
import styles from "./Buttons.scss";


const SubmitButton = (props) => {
    
    // const active = true; // setting this true for now

    return props.active ? (
      <React.Fragment>
        <div className={cn('submit-button', 'submit-button-padding', 'clickable', jC, aC, allC)} to="/dashboard">
            <div className={cn(allC, full)}>
                  <ButtonText text={props.text} className={cn(allC)} />
            </div>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className={cn('submit-button', 'submit-button-padding', 'clickable', jC, aC, allC)} to="/dashboard">
            <div className={cn(allC, full)}>
                  <ButtonText text={props.text} className={cn(allC)} />
            </div>
        </div>
      </React.Fragment>
    )

};

export default SubmitButton;

// !!!! change text