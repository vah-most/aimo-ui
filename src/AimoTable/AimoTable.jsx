/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

import AimoPagination from "@aimo.ui/aimo-pagination";

import "./AimoTable.css";

const AimoTable = ({
  autoAddRowNumbers = false,
  cellClassName = "",
  className = "",
  columnProps = {},
  data = [],
  disableDeleteOperation = true,
  disableEditOperation = true,
  headerClassName = "",
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
  title,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [innerSortedBy, setInnerSortedBy] = useState(sortedBy);
  const [innerSortedDirAsc, setInnerSortedDirAsc] = useState(sortedDirAsc);

  const pageCount = Math.ceil(data.length / rowsPerPage);

  const getCurrentPageData = (data) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const filteredData = data.slice(startIndex, startIndex + rowsPerPage);
    return [...filteredData];
  };

  const handleInnerSort = (fieldName, sortedDirAsc) => {
    setInnerSortedBy(fieldName);
    setInnerSortedDirAsc(sortedDirAsc);
  };

  const performInnerDataSort = () => {
    const sortedData = data.sort((item1, item2) => {
      if (item1[innerSortedBy] > item2[innerSortedBy])
        return innerSortedDirAsc ? 1 : -1;
      else return innerSortedDirAsc ? -1 : 1;
    });

    return sortedData;
  };

  const addDataRowNumber = (data) => {
    return data.map((row, index) => ({
      number: index + 1,
      ...row,
    }));
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
      `columnHeader col` +
      ` ${className}` +
      (isSortable ? " sortableHeader" : "");
    if (isSortable) {
      return (
        <td
          key={`header-${index}`}
          className={thClasses}
          onClick={() => {
            onSort
              ? onSort(fieldName, !sortedDirAsc)
              : handleInnerSort(fieldName, !innerSortedDirAsc);
          }}
        >
          <div className={`tableCellContainer`}>
            {title}
            {fieldName === innerSortedBy &&
              (innerSortedDirAsc ? (
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
        disabledArrowClassName="paginationDisabledArrow"
        onPageChange={handlePageChange}
        pageContainerClassName="paginationPage"
        pageContainerDisabledClassName="paginationPage paginationDisabledPage"
        pageCount={pageCount}
        pageTextClassName="paginationPageText"
        selectedTextClassName="paginationSelectedPageText"
        selectedContainerClassName="paginationPage paginationSelectedPage"
      />
    );
  };

  let finalData = data;
  if (!onSort) {
    finalData = performInnerDataSort();
    if (autoAddRowNumbers) finalData = addDataRowNumber(finalData);
    finalData = getCurrentPageData(finalData);
  }

  return (
    <div className={`tableContainer ${className}`}>
      {title && <div className="tableTitleContainer">{title}</div>}
      <table className="table">
        <thead>
          <tr>
            {autoAddRowNumbers && (
              <td
                className={`columnHeader columnNumberHeader ${headerClassName}`}
              >
                #
              </td>
            )}
            {Object.entries(columnProps).map(([keyName, column], index) => {
              return renderTableHeader(
                index,
                column.headerTitle,
                column.headerClassName,
                column.isSortable,
                keyName
              );
            })}
            {(!disableDeleteOperation || !disableEditOperation) && (
              <td
                className={`centeredText columnHeader ${headerClassName} ${operationHeaderClassName}`}
              >
                Operations
              </td>
            )}
          </tr>
        </thead>
        <tbody>
          {finalData.map((row, index) => {
            return (
              <tr key={index} className={`${rowClassName}`}>
                {autoAddRowNumbers && (
                  <td className={`centeredText ${cellClassName} rowNumberCell`}>
                    <div className="centeredText">{row.number}</div>
                  </td>
                )}
                {Object.entries(columnProps).map(
                  ([keyName, column], fIndex) => {
                    return (
                      <td
                        key={`${index}-${keyName}`}
                        className={`itemCell ${cellClassName}
                          ${column.cellClassName ? column.cellClassName : ""}`}
                      >
                        {column.renderFunc
                          ? column.renderFunc(row)
                          : row[keyName]}
                      </td>
                    );
                  }
                )}

                {(!disableDeleteOperation || !disableEditOperation) && (
                  <td
                    className={`itemCell align-middle text-center  ${cellClassName} ${operationCellClassName}`}
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
                  </td>
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
  autoAddRowNumbers: PropTypes.bool,
  cellClassName: PropTypes.string,
  className: PropTypes.string,
  columnProps: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  disableDeleteOperation: PropTypes.bool,
  disableEditOperation: PropTypes.bool,
  headerClassName: PropTypes.string,
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
