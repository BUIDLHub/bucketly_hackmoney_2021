import React, { useState } from 'react';
import { Collapse, Button } from 'reactstrap';
import cn from "classnames";

const CollapsibleSection = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={cn('pt-2')}>
      {/* <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Toggle</Button> */}
      <div onClick={toggle} className={cn('mb-1', 'text-white', 'bold', 'text-size-20', 'roboto')}>
          {props.q}
      </div>
      <Collapse isOpen={isOpen}>
          <div className={cn('px-1', 'py-1', 'text-white')}>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </div>
      </Collapse>
    </div>
  );
}

// !!!! Font Awesome carets up and down corresponding with isOpen state

export default CollapsibleSection;