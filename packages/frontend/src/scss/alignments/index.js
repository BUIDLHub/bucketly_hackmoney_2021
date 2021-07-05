import cn from 'classnames';

export const noMargin = cn('m-0');
export const noPad = cn('p-0');

export const noMarginPad = cn(noMargin, noPad);
export const nMP = noMarginPad;

export const full = 'w-100';
export const f = full;

// Justify
export const justLeft = cn('justify-content-start', 'justify-items-start');
export const jL = justLeft;

export const justCenter = cn('justify-content-center', 'justify-items-center');
export const jC = justCenter;

export const justRight = cn('justify-content-end', 'justify-items-end');
export const jR = justRight;

// Alignment

export const alignLeft = cn('align-items-start', 'align-content-start');
export const aL = alignLeft;

export const alignCenter = cn('align-items-center', 'align-content-center');
export const aC = alignCenter;

export const alignRight = cn('align-items-end', 'align-content-end');
export const aR = alignRight;

// Rows

const flex = 'd-flex';
const row = 'flex-row';

export const leftLeft = cn(flex, row, justLeft, alignLeft);
export const lL = leftLeft;

export const leftCenter = cn(flex, row, justLeft, alignCenter);
export const lC = leftCenter;

export const rightRight = cn(flex, row, justRight, alignRight);
export const rR = rightRight;

export const rightCenter = cn(flex, row, justRight, alignCenter);
export const rC = rightCenter;

export const allCenter = cn(flex, row, justCenter, alignCenter);
export const allC = allCenter;

export const topCenterRow = cn(flex, row, justCenter);
export const tCR = topCenterRow;

// Column Top

const col = 'flex-column';
export const topLeft = cn(flex, col, justLeft, alignLeft);
export const tL = topLeft;

export const topRight = cn(flex, col, rightRight);
export const tR = topRight;

export const topCenter = cn(flex, col, justLeft, alignCenter);
export const tC = topCenter;

// Column Bottom

export const bottomLeft = cn(flex, col, justLeft, alignLeft);
export const bL = bottomLeft;

export const bottomRight = cn(flex, col, justRight, alignRight);
export const bR = bottomRight;

export const bottomCenter = cn(flex, col, justRight, alignCenter);
export const bC = bottomCenter;

// Center

// export const hCenter = allCenter;
// export const hLeftCenter = leftCenter;
// export const hLeftTop = leftLeft;
// export const hLeftBottom = cn(flex, row, justLeft, alignRight);

// export const hRightCenter = rightCenter;
// export const hRightTop = cn(flex, row, justLeft, justLeft);
// export const hRightBottom = cn(flex, row, justRight, alignRight);

// export const vCenter = topCenter;
// export const vLeftCenter = cn(flex, col, justLeft, alignCenter);
// export const vLeftTop = cn(flex, col, justLeft, alignLeft);
// export const vLeftBottom = cn(flex, col, justLeft, alignRight);


