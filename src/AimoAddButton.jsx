/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AimoTooltip from "./AimoTooltip";

import "./AimoAddButton.scss";

const AimoAddButton = ({ className, onClick, style, ...extra }) => {
  return (
    <div
      className={`addButton hand ${className}`}
      onClick={onClick}
      style={style}
      {...extra}
    >
      <span id="button_new_task">Add Task </span>
      <AimoTooltip target="button_new_task">
        <span>Add new task </span>
        <span className="shortcutText">(F2)</span>
      </AimoTooltip>
    </div>
  );
};

export default AimoAddButton;
