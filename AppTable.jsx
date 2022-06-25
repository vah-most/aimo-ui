import React from "react";

import AppIcon from "./AppIcon";
import AppAddButton from "./AppAddButton";

import "./AppTable.scss";

const Table = ({ compactMode = true, compactFields = [], data, header, onAdd, onSort, sortBy, sortDirAsc, style }) => {
    const fields = [
        {
            field: "id",
            title: <AppAddButton onClick={onAdd} />,
            size: 1,
            isSortable: false,
            classes: "text-center"

        },
        ...header,
        {
            field: "operations",
            title: "Operations",
            size: 0,
            isSortable: false,
            classes: "text-center"
        },

    ];


    const renderTableHeader = (
        index,
        title,
        size,
        extraClasses = "",
        isSortable = false,
        field = null
    ) => {
        const thClasses =
            (size > 0 ? `col-sm-${size}` : "col-sm") + ` ${extraClasses}` + (isSortable ? " hand" : "");
        if (isSortable) {
            return (
                <th
                    key={index}
                    className={thClasses}
                    onClick={() => {
                        onSort && onSort(field, !sortDirAsc);
                    }}
                    scope="col"
                >
                    {title}
                    {field === sortBy &&
                        (sortDirAsc ? (
                            <AppIcon name="angle-down" />
                        ) : (
                            <AppIcon name="angle-up" />
                        ))}
                </th>
            );
        } else {
            return (
                <th key={title} className={thClasses} scope="col" >
                    {title}
                </th>
            );
        }
    };

    return (
        <div className="tableContainer" style={style} >
            <table className="table">
                <thead>
                    <tr>
                        {
                            fields.map((column, index) => {
                                if (compactMode && !compactFields.includes(column.field))
                                    return null;
                                return renderTableHeader(index, column.title, column.size, column.classes, column.isSortable, column.field);
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, index) => {
                            return <tr key={index}>
                                {!compactMode &&
                                    <th className="align-middle text-center" scope="row" >
                                        {index + 1}
                                    </th>}
                                {
                                    row.map((item, fIndex) => {
                                        if (compactMode && !compactFields.includes(item.field))
                                            return null;
                                        return <td key={fIndex} className={item.cellClasses ? item.cellClasses : ""}>
                                            {item.render()}
                                        </td>;
                                    })
                                }
                                {!compactMode &&
                                    <th className="align-middle text-center" scope="row" >
                                        &nbsp;
                                    </th>}
                            </tr>;
                        })
                    }
                </tbody>
            </table>
        </div>);
};

export default Table;