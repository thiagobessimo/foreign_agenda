import React from "react";

import { Icon } from '@types';

const ArrowRightIcon: Icon = ({ fill }) => (
  <svg width="35" height="7" viewBox="0 0 35 7" version="1.1">
    <path
      d="M 3.5 0L 6.53109 5.25L 0.468911 5.25L 3.5 0Z"
      transform="matrix(0 1 -1 0 35 0)"
      fill={fill}
    />
    <line
      y1="-0.5"
      x2="30"
      y2="-0.5"
      transform="translate(0 4)"
      stroke={fill}
    />
  </svg>
)

export default ArrowRightIcon;
