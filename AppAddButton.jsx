/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AppTooltip from "./AppTooltip";

import "./AppAddButton.scss";

const AppAddButton = ({ onClick, style, ...extra }) => {
  return (
    <div className="addButton hand" onClick={onClick} style={style} {...extra}>
      <span id="button_new_task">+ New ... </span>
      <AppTooltip target="button_new_task">Add new task (F2)</AppTooltip>
    </div>
  );
};

export default AppAddButton;
