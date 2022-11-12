/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

import AimoPagination from "./AimoPagination";

import "./AimoTable.scss";

const AimoTable = ({
  className = "",
  columnProps = {},
  data = [],
  disableDeleteOperation = false,
  disableEditOperation = false,
  onPageChange = null,
  onRequestDelete = null,
  onRequestEdit = null,
  onSort = null,
  operationCellClassName = "",
  operationHeaderClassName = "",
  renderPagination = null,
  rowClassName = "",
  rowsPerPage = 10,
  showPagination = true,
  sortedBy = null,
  sortedDirAsc = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(data.length / rowsPerPage);

  let fields = { ...columnProps };
  if (!disableDeleteOperation || !disableEditOperation)
    fields.operations = {
      headerTitle: "Operations",
      isSortable: false,
      headerClassName: `col text-center ${operationHeaderClassName}`,
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
      (isSortable ? " sortableHeader" : "");
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
                <div className="tableHeaderSortArrow">↓</div>
              ) : (
                <div className="tableHeaderSortArrow">↑</div>
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
      <AimoPagination
        containerClassName="paginationContainer"
        onPageChange={handlePageChange}
        pageCount={pageCount}
      />
    );
  };

  const filteredData = getCurrentPageData();

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
              <tr key={index} className={`${rowClassName}`}>
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
                  <th
                    className={`align-middle text-center  ${operationCellClassName}`}
                    scope="row"
                  >
                    <div className={"rowOperationContainer"}>
                      {!disableEditOperation && (
                        <div className="rowOperationEdit">
                          <div
                            onClick={() => {
                              onRequestEdit && onRequestEdit(row);
                            }}
                          >
                            📝
                          </div>
                        </div>
                      )}
                      {!disableDeleteOperation && (
                        <div className="ms-2 rowOperationDelete">
                          <div
                            onClick={() => {
                              onRequestDelete && onRequestDelete(row);
                            }}
                          >
                            ❌
                          </div>
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
  operationCellClassName: PropTypes.string,
  operationHeaderClassName: PropTypes.string,
  renderPagination: PropTypes.func,
  rowClassName: PropTypes.string,
  rowsPerPage: PropTypes.number,
  showPagination: PropTypes.bool,
  sortedBy: PropTypes.string,
  sortedDirAsc: PropTypes.bool,
};

export default AimoTable;
