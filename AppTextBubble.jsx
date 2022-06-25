import React, { useState } from "react";

import AppIcon from "./AppIcon";

import "./AppTextBubble.scss";

function AppTextBubble({ backgroundColor = "#FFA500", onDelete, text }) {
    const [displayDelete, setDisplayDelete] = useState(false);

    return (
        <div
            className="textBubble"
            onMouseOut={() => {
                setDisplayDelete(false);
            }}
            onMouseOver={() => {
                setDisplayDelete(true);
            }}
            style={{ backgroundColor: backgroundColor }}
        >
            <div
                className="textBubbleDelete"
                onClick={onDelete}
                style={
                    displayDelete ? { visibility: "visible" } : { visibility: "hidden" }
                }
            >
                <AppIcon name="times" />
            </div>
            <span>
                {text}
            </span>
        </div>
    );
}

export default AppTextBubble;
