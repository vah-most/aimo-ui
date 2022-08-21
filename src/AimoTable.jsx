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
  columnProps,
  data,
  disableDeleteOperation = false,
  disableEditOperation = false,
  onPageChange,
  onRequestDelete,
  onRequestEdit,
  onSort,
  renderPagination,
  rowsPerPage = 10,
  showPagination = true,
  sortedBy,
  sortedDirAsc,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  let fields = { ...columnProps };
  if (!disableDeleteOperation || !disableEditOperation)
    fields.operations = {
      headerTitle: "Operations",
      isSortable: false,
      headerClassName: "col text-center",
    };

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
    className = "",
    isSortable = false,
    fieldName = null
  ) => {
    const thClasses =
      ` align-middle rowHeader col` +
      ` ${className}` +
      (isSortable ? " hand" : "");
    if (isSortable) {
      return (
        <td
          key={`header-${index}`}
          className={thClasses}
          onClick={() => {
            onSort && onSort(fieldName, !sortedDirAsc);
          }}
        >
          <div className={`tableCellContainer`}>
            {title}
            {fieldName === sortedBy &&
              (sortedDirAsc ? (
                <AimoIcon className="tableHeaderSortArrow" name="angle-down" />
              ) : (
                <AimoIcon className="tableHeaderSortArrow" name="angle-up" />
              ))}
          </div>
        </td>
      );
    } else {
      return (
        <td key={`header-${index}`} className={thClasses}>
          {title}
        </td>
      );
    }
  };

  const renderTablePagination = () => {
    if (!showPagination) return null;

    if (typeof renderPagination === "function")
      return renderPagination(pageCount);

    if (pageCount <= 1) return null;

    return (
      <AimoPagination onPageChange={handlePageChange} pageCount={pageCount} />
    );
  };

  const filteredData = getCurrentPageData();
  const pageCount = Math.ceil(data.length / rowsPerPage);

  return (
    <div className={`tableContainer ${className}`}>
      <table className="table">
        <thead>
          <tr>
            {Object.entries(fields).map(([keyName, column], index) => {
              return renderTableHeader(
                index,
                column.headerTitle,
                column.headerClassName,
                column.isSortable,
                keyName
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => {
            return (
              <tr key={index} className={`${row.className}`}>
                {Object.entries(columnProps).map(
                  ([keyName, column], fIndex) => {
                    return (
                      <td
                        key={`${index}-${keyName}`}
                        className={
                          column.cellClassName ? column.cellClassName : ""
                        }
                      >
                        {column.renderFunc
                          ? column.renderFunc(row)
                          : row[keyName]}
                      </td>
                    );
                  }
                )}

                {(!disableDeleteOperation || !disableEditOperation) && (
                  <th className="align-middle text-center" scope="row">
                    <div className="rowOperationContainer">
                      {!disableEditOperation && (
                        <div className="rowOperationEdit">
                          <AimoIcon
                            name="edit"
                            onClick={() => {
                              onRequestEdit && onRequestEdit(row);
                            }}
                          />
                        </div>
                      )}
                      {!disableDeleteOperation && (
                        <div className="ms-2 rowOperationDelete">
                          <AimoIcon
                            name="remove"
                            onClick={() => {
                              onRequestDelete && onRequestDelete(row);
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
      <div>{renderTablePagination()}</div>
    </div>
  );
};

AimoTable.propTypes = {
  className: PropTypes.string,
  columnProps: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  disableDeleteOperation: PropTypes.bool,
  disableEditOperation: PropTypes.bool,
  onPageChange: PropTypes.func,
  onRequestDelete: PropTypes.func,
  onRequestEdit: PropTypes.func,
  onSort: PropTypes.func,
  renderPagination: PropTypes.func,
  rowsPerPage: PropTypes.number,
  showPagination: PropTypes.bool,
  sortedBy: PropTypes.string,
  sortedDirAsc: PropTypes.bool,
};

export default AimoTable;
