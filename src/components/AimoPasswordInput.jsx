/*
 * Created on Sun Jul 31 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";
import AimoIcon from "./AimoIcon";

import "./AimoPasswordInput.scss";

const AimoPasswordInput = ({ className, type, ...extra }) => {
  const [hide, setHide] = useState(true);

  const toggleHide = () => {
    setHide(!hide);
  };

  return (
    <div className="passwordInputContainer">
      <input
        className={`passwordInput ${className}`}
        type={hide ? "password" : "text"}
        {...extra}
      />
      <AimoIcon
        className="hand passwordInputIcon"
        name={hide ? "eye" : "eye-slash"}
        onClick={toggleHide}
      />
    </div>
  );
};

export default AimoPasswordInput;
