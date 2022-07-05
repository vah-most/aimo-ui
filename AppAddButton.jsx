/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import "./AppAddButton.scss";

const AppAddButton = ({ backgroundColor = "#90EE90", onClick }) => {
  return (
    <div
      className="addButton hand"
      onClick={onClick}
      style={{ backgroundColor: backgroundColor }}
    >
      <span>+ New ... </span>
    </div>
  );
};

export default AppAddButton;
