/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

const AppIcon = ({ name, className = "", ...extra }) => {
  const classes = `fa fa-${name} ms-1 ${className}`;
  return <i aria-hidden="true" className={classes} {...extra} />;
};

export default AppIcon;
