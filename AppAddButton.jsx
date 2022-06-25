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