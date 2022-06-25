const AppIcon = ({ name, className = "", ...extra }) => {
    const classes = `fa fa-${name} ms-1 ${className}`;
    return (
        <i aria-hidden="true" className={classes} {...extra} />
    );
};

export default AppIcon;