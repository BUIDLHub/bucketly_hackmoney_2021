import React, {useState} from 'react';
import {lC, full, nMP, aL} from '../../../scss/alignments';
import cn from "classnames";
import { Row, Col } from 'reactstrap';
import CollapsibleSection from "./CollapsibleSection";

const FAQs = () => {
 return (
     <div className={cn(full, 'pl-3', 'py-5')}>
<div className={cn(full, aL)}>
    
    <Row>
    <p className={cn('roboto', 'text-size-20', 'regular', 'text-white')}>FAQs</p>
</Row>
<Row>
<CollapsibleSection q="What is Bucketly?" />
</Row>
<Row>
<CollapsibleSection q="How do I withdraw?" />
</Row>
<Row>
<CollapsibleSection q="How long does it take?" />
</Row>
<Row>
<CollapsibleSection q="Who maintains Bucketly?" />
</Row>
     </div>
     
     </div>
     
 )
}

export default FAQs;