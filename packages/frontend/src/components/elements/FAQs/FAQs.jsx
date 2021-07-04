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
<CollapsibleSection q="What is Bucketly?" a="Imagine you just want to make it over to this magical place where txn costs are cheaper. That's what bucketly is. It's a train over there,  except it's a bucket that gets filled with all the passengers that are token amounts. It's redeemed in the magical L2 land from the merkle root tree hash." />
</Row>
<Row>
<CollapsibleSection q="How do I withdraw?" a="Switch over to Polygon and then withdraw, we cache the transfers in the browser to make it easier." />
</Row>
<Row>
<CollapsibleSection q="How long does it take?" a="It varies token-to-token based on the bucket timer and calculated balance threshold for the bucket." />
</Row>
<Row>
<CollapsibleSection q="Who maintains Bucketly?" a="Just some bois looking out for you." />
</Row>
<Row>
<CollapsibleSection q="What tokens can I transfer" a="Polygon approved tokens" />
</Row>
     </div>
     
     </div>
     
 )
}

export default FAQs;