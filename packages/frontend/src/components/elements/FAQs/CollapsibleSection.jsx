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
          {props.a}
          </div>
      </Collapse>
    </div>
  );
}

// !!!! Font Awesome carets up and down corresponding with isOpen state

export default CollapsibleSection;