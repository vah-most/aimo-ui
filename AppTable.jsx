/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";

import AppIcon from "./AppIcon";
import AppAddButton from "./AppAddButton";
import AppPagination from "./AppPagination";

import "./AppTable.scss";

const Table = ({
  compactFields = [],
  compactMode = true,
  data,
  header,
  onRequestAdd,
  onRequestEdit,
  onRequestDelete,
  onSort,
  operationsInCompactMode = false,
  rowsPerPage = 10,
  sortBy,
  sortDirAsc,
  style,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const fields = [
    {
      field: "id",
      title: <AppAddButton onClick={onRequestAdd} />,
      size: 1,
      isSortable: false,
      classes: "text-center",
    },
    ...header,
    {
      field: "operations",
      title: "Operations",
      size: 0,
      isSortable: false,
      classes: "text-center",
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
      (size > 0 ? `col-sm-${size}` : "col-sm") +
      ` ${extraClasses}` +
      (isSortable ? " hand" : "");
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
        <th key={title} className={thClasses} scope="col">
          {title}
        </th>
      );
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const filteredData = data.slice(startIndex, startIndex + rowsPerPage);
    return [...filteredData];
  };

  const filteredData = getCurrentPageData();

  return (
    <div className="tableContainer" style={style}>
      <table className="table">
        <thead>
          <tr>
            {fields.map((column, index) => {
              const shouldShow =
                !compactMode ||
                (compactMode &&
                  operationsInCompactMode &&
                  column.field === "operations") ||
                (compactMode && compactFields.includes(column.field));
              return shouldShow
                ? renderTableHeader(
                    index,
                    column.title,
                    column.size,
                    column.classes,
                    column.isSortable,
                    column.field
                  )
                : null;
            })}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => {
            return (
              <tr key={index} className={`${row.className}`}>
                {!compactMode && (
                  <th className="align-middle text-center" scope="row">
                    {index + 1}
                  </th>
                )}
                {row.fields.map((item, fIndex) => {
                  if (compactMode && !compactFields.includes(item.field))
                    return null;
                  if (item.render === null) return null;
                  return (
                    <td
                      key={fIndex}
                      className={item.cellClasses ? item.cellClasses : ""}
                    >
                      {item.render()}
                    </td>
                  );
                })}
                {(!compactMode || operationsInCompactMode) && (
                  <th className="align-middle text-center" scope="row">
                    <div className="rowOperationContainer">
                      <div className="rowOperationEdit">
                        <AppIcon
                          name="edit"
                          onClick={() => {
                            onRequestEdit && onRequestEdit(row.id);
                          }}
                        />
                      </div>
                      <div className="ms-2 rowOperationDelete">
                        <AppIcon
                          name="remove"
                          onClick={() => {
                            onRequestDelete && onRequestDelete(row.id);
                          }}
                        />
                      </div>
                    </div>
                  </th>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <AppPagination
          onPageChange={handlePageChange}
          pageCount={data.length / rowsPerPage}
        />
      </div>
    </div>
  );
};

export default Table;
