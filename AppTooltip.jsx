/*
 * Created on Sun Jul 17 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { UncontrolledTooltip } from "reactstrap";

import "./AppTooltip.scss";

const AppTooltip = ({ target, children }) => {
  return (
    <UncontrolledTooltip
      placement="bottom-start"
      delay={{ show: 100, hide: 0 }}
      target={target}
    >
      {children}
    </UncontrolledTooltip>
  );
};

export default AppTooltip;
