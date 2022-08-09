/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import "font-awesome/css/font-awesome.css";

const AimoIcon = ({ name, className = "", ...extra }) => {
  const classes = `fa fa-${name} ${className}`;
  return <i aria-hidden="true" className={classes} {...extra} />;
};

export default AimoIcon;
