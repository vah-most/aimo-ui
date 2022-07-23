/*
 * Created on Thu Jul 21 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import "./AppButton.scss";

const AppButton = ({ children, className, onClick }) => {
  return (
    <div className={`hand button ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default AppButton;
