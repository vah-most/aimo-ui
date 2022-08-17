/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

import AimoIcon from "./AimoIcon";
import AimoPagination from "./AimoPagination";

import "./AimoTable.scss";

const AimoTable = ({
  className,
  data,
  disableDeleteOperation = false,
  disableEditOperation = false,
  header,
  onPageChange,
  onRequestDelete,
  onRequestEdit,
  onSort,
  rowsPerPage = 10,
  showPagination = true,
  sortedBy,
  sortedDirAsc,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  let fields = [...header];
  if (!disableDeleteOperation || !disableEditOperation)
    fields.push({
      field: "operations",
      title: "Operations",
      size: 2,
      isSortable: false,
      classes: "text-center",
    });

  const columns = fields.map((f) => f.field);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const filteredData = data.slice(startIndex, startIndex + rowsPerPage);
    return [...filteredData];
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected);
    onPageChange && onPageChange(selected);
  };

  const renderTableHeader = (
    index,
    title,
    size,
    extraClasses = "",
    isSortable = false,
    field = null
  ) => {
    const thClasses =
      (size > 0 ? `col-${size}` : "col") +
      ` align-middle rowHeader` +
      ` ${extraClasses}` +
      (isSortable ? " hand" : "");
    if (isSortable) {
      return (
        <td
          key={index}
          className={thClasses}
          onClick={() => {
            onSort && onSort(field, !sortedDirAsc);
          }}
        >
          <div className="tableCellContainer">
            {title}
            {field === sortedBy &&
              (sortedDirAsc ? (
                <AimoIcon name="angle-down" />
              ) : (
                <AimoIcon name="angle-up" />
              ))}
          </div>
        </td>
      );
    } else {
      return (
        <td key={title} className={thClasses}>
          {title}
        </td>
      );
    }
  };

  const filteredData = getCurrentPageData();
  const pageCount = Math.ceil(data.length / rowsPerPage);

  return (
    <div className={`tableContainer ${className}`}>
      <table className="table">
        <thead>
          <tr>
            {fields.map((column, index) => {
              return renderTableHeader(
                index,
                column.title,
                column.size,
                column.classes,
                column.isSortable,
                column.field
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => {
            return (
              <tr key={index} className={`${row.className}`}>
                {row.fields.map((item, fIndex) => {
                  if (!columns.includes(item.field)) return null;
                  return (
                    <td
                      key={fIndex}
                      className={item.cellClasses ? item.cellClasses : ""}
                    >
                      {item.render ? item.render() : item.text}
                    </td>
                  );
                })}
                {(!disableDeleteOperation || !disableEditOperation) && (
                  <th className="align-middle text-center" scope="row">
                    <div className="rowOperationContainer">
                      {!disableEditOperation && (
                        <div className="rowOperationEdit">
                          <AimoIcon
                            name="edit"
                            onClick={() => {
                              onRequestEdit && onRequestEdit(row.id);
                            }}
                          />
                        </div>
                      )}
                      {!disableDeleteOperation && (
                        <div className="ms-2 rowOperationDelete">
                          <AimoIcon
                            name="remove"
                            onClick={() => {
                              onRequestDelete && onRequestDelete(row.id);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {showPagination && pageCount > 1 && (
          <AimoPagination
            onPageChange={handlePageChange}
            pageCount={pageCount}
          />
        )}
      </div>
    </div>
  );
};

AimoTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  disableDeleteOperation: PropTypes.bool,
  disableEditOperation: PropTypes.bool,
  header: PropTypes.array.isRequired,
  onPageChange: PropTypes.func,
  onRequestDelete: PropTypes.func,
  onRequestEdit: PropTypes.func,
  onSort: PropTypes.func,
  rowsPerPage: PropTypes.number,
  showPagination: PropTypes.bool,
  sortedBy: PropTypes.string,
  sortedDirAsc: PropTypes.bool,
};

export default AimoTable;
