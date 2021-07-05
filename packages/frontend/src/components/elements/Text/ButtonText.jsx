import React from 'react';
import cn from "classnames";
import styles from "./text.scss";

const ButtonText = ({text}) => {
return (
    <p className={cn('text-white', 'text-size-20', 'bold', 'roboto')}>{text}</p>
)
}

export default ButtonText