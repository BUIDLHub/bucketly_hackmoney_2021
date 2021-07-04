import React from 'react';
import {lC, full, nMP} from '../../../scss/alignments';
import cn from "classnames";


const NavLink = ({href, text}) => {
return (
    <div className={cn(full, 'px-3')}>
<a href={href} rel="noopener noreferrer">
<Link text={text} />
</a>
    </div>
)
}

const Link = ({text}) => {
    return (
<p className={cn('roboto', 'regular', 'text-uppercase', 'text-white')}>{text}</p>
    )
}

export default NavLink;