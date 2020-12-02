import React from "react";

import { Icon } from '@types';

const SubmittedCheckIcon: Icon = ({ fill }) => (
  <svg
    width="90"
    height="90"
    viewBox="0 0 90 90"
    fill={ fill }
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.75"
      y="0.75"
      width="88.5"
      height="88.5"
      rx="14.25"
      stroke="black"
      stroke-width="1.5"
    />
    <path
      d="M25.0713 47.4684L39.7878 60.4284L64.9284 29.5713"
      stroke="black"
      stroke-width="1.5"
    />
  </svg>
)

export default SubmittedCheckIcon;
