import React from 'react';
import cn from "classnames";
import styles from "./text.scss";

const TabText = ({text, active}) => {
return active ? (
    <React.Fragment>
       <p className={cn('text-white', 'font-size-20', 'bold', 'roboto')}>{text}</p>
    </React.Fragment>
  ) : (
    <React.Fragment>
         <p className={cn('text-black', 'font-size-20', 'bold', 'roboto')}>{text}</p>
    </React.Fragment>
  )
}

// !!!! needs some sort of active state

export default TabText;