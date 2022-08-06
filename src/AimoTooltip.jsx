/*
 * Created on Sun Jul 17 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";
import { Tooltip } from "reactstrap";

import "./AimoTooltip.scss";

const AimoTooltip = ({
  autoHide = true,
  autoHideTimeout = 2000,
  children,
  target,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => {
    setTooltipOpen(!tooltipOpen);
  };

  if (autoHide && tooltipOpen) {
    setTimeout(() => {
      setTooltipOpen(false);
    }, autoHideTimeout);
  }

  return (
    <Tooltip
      isOpen={tooltipOpen}
      placement="bottom-start"
      target={target}
      toggle={toggle}
    >
      {children}
    </Tooltip>
  );
};

export default AimoTooltip;