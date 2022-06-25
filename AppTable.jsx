import React from "react";

import "./AppTable.scss";
import AppIcon from "./AppIcon";

const Table = ({ data, header, onSort, sortBy, sortDirAsc }) => {
    const fields = [
        {
            field: "id",
            title: "#",
            size: 1,
            isSortable: false
        },
        ...header,
        {
            field: "operations",
            title: "Operations",
            size: 0,
            isSortable: false
        },

    ];


    const renderTableHeader = (
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
                    key={title}
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
        <table className="table">
            <thead>
                <tr>
                    {
                        fields.map(column => {
                            return renderTableHeader(column.title, column.size, column.classes, column.isSortable, column.field);
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row, index) => {
                        return <tr key={index}>
                            <th className="align-middle" scope="row" >
                                {index + 1}
                            </th>
                            {
                                row.map((field, fIndex) => {
                                    return <td key={fIndex} className={field.cellClasses ? field.cellClasses : ""}>
                                        {field.render()}
                                    </td>;
                                })
                            }
                            <th className="align-middle" scope="row" >
                                &nbsp;
                            </th>
                        </tr>;
                    })
                }
            </tbody>
        </table>);
};

export default Table;