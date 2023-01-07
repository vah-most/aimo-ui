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
import AimoSearchBar from "@aimo.ui/aimo-searchbar";
import AimoTooltip from "@aimo.ui/aimo-tooltip";

import RefreshIcon from "./RefreshIcon.svg";

import "./AimoTable.css";

const AimoTable = ({
  autoAddRowNumbers = false,
  cellClassName = "",
  className = "",
  cellContentClassName = "",
  columnProps = {},
  data = [],
  disableDeleteOperation = true,
  disableEditOperation = true,
  disableRefreshOperation = true,
  disableSearchOperation = true,
  headerClassName = "",
  onPageChange = null,
  onRefresh = null,
  onRequestDelete = null,
  onRequestEdit = null,
  onSort = null,
  operationCellClassName = "",
  operationHeaderClassName = "",
  paginationDisabledPageClassName = "",
  paginationPageClassName = "",
  paginationSelectedPageClassName = "",
  renderPagination = null,
  rowClassName = "",
  rowsPerPage = 10,
  showPagination = true,
  sortedBy = null,
  sortedDirAsc = true,
  title,
  tooltipArrowClassName = "",
  tooltipBodyClassName = "",
  tooltipClassName = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [innerSortedBy, setInnerSortedBy] = useState(sortedBy);
  const [innerSortedDirAsc, setInnerSortedDirAsc] = useState(sortedDirAsc);
  const [searchText, setSearchText] = useState("");

  const getCurrentPageData = (data) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const filteredData = data.slice(startIndex, startIndex + rowsPerPage);
    return [...filteredData];
  };

  const handleInnerSort = (fieldName, sortedDirAsc) => {
    setInnerSortedBy(fieldName);
    setInnerSortedDirAsc(sortedDirAsc);
  };

  const performInnerDataSort = (data) => {
    const sortedData = data.sort((item1, item2) => {
      if (
        columnProps[innerSortedBy] &&
        typeof columnProps[innerSortedBy].sortFunc === "function"
      )
        return columnProps[innerSortedBy].sortFunc(
          item1[innerSortedBy],
          item2[innerSortedBy],
          innerSortedDirAsc
        );

      if (item1[innerSortedBy] > item2[innerSortedBy])
        return innerSortedDirAsc ? 1 : -1;
      else return innerSortedDirAsc ? -1 : 1;
    });

    return sortedData;
  };

  const filterData = (data) => {
    if (searchText.length === 0) return data;
    const search = searchText.toLowerCase();
    const filteredData = data.filter((row) => {
      for (const [key, value] of Object.entries(row)) {
        if (
          value &&
          value.toString() &&
          value.toString().toLowerCase().includes(search)
        ) {
          return true;
        }
      }
      return false;
    });

    return filteredData;
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
      `columnHeader col ${headerClassName}` +
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

  const renderTablePagination = (pageCount) => {
    if (!showPagination) return null;

    if (typeof renderPagination === "function")
      return renderPagination(pageCount);

    if (pageCount <= 1) return null;

    return (
      <AimoPagination
        containerClassName="paginationContainer"
        disabledArrowClassName="paginationDisabledArrow"
        onPageChange={handlePageChange}
        pageContainerClassName={`paginationPage ${paginationPageClassName}`}
        pageContainerDisabledClassName={`paginationPage 
          ${paginationPageClassName} 
          paginationDisabledPage
          ${paginationDisabledPageClassName}`}
        pageCount={pageCount}
        pageTextClassName="paginationPageText"
        selectedTextClassName="paginationSelectedPageText"
        selectedContainerClassName={`paginationPage 
          ${paginationPageClassName} 
          paginationSelectedPage 
          ${paginationSelectedPageClassName}`}
      />
    );
  };

  let finalData = data;
  if (!disableSearchOperation) {
    finalData = filterData(finalData);
  }

  const pageCount = Math.ceil(finalData.length / rowsPerPage);

  if (!onSort) {
    finalData = performInnerDataSort(finalData);
    if (autoAddRowNumbers) finalData = addDataRowNumber(finalData);
    finalData = getCurrentPageData(finalData);
  }

  const showTitleHeader = title || !disableSearchOperation;

  return (
    <div className={`tableContainer ${className}`}>
      {showTitleHeader && (
        <div className="tableTitleContainer">
          {title && <div>{title}</div>}
          <div className="titleOperationsContainer">
            {!disableSearchOperation && (
              <AimoSearchBar
                className="titleSearchBar"
                iconSide="right"
                onChange={setSearchText}
              />
            )}
            {!disableRefreshOperation && (
              <div className="titleRefresh" onClick={onRefresh}>
                <img alt="↺" className="titleRefreshIcon" src={RefreshIcon} />
              </div>
            )}
          </div>
        </div>
      )}
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
                    <div className={`centeredText ${cellContentClassName}`}>
                      {row.number}
                    </div>
                  </td>
                )}
                {Object.entries(columnProps).map(
                  ([keyName, column], fIndex) => {
                    return (
                      <td
                        key={`${index}-${keyName}`}
                        className={`itemCell ${cellClassName}    ${
                          column.cellClassName ? column.cellClassName : ""
                        }`}
                      >
                        <div
                          className={`${cellContentClassName}    ${
                            column.cellContentClassName
                              ? column.cellContentClassName
                              : ""
                          }`}
                          id={`${keyName}-${index}-id`}
                        >
                          {column.renderFunc
                            ? column.renderFunc(row)
                            : row[keyName]}
                        </div>
                        {column.renderTooltip ? (
                          <AimoTooltip
                            arrowClassName={tooltipArrowClassName}
                            bodyClassName={tooltipBodyClassName}
                            containerClassName={tooltipClassName}
                            target={`${keyName}-${index}-id`}
                          >
                            {column.renderTooltip(row)}
                          </AimoTooltip>
                        ) : null}
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
      <div>{renderTablePagination(pageCount)}</div>
    </div>
  );
};

AimoTable.propTypes = {
  autoAddRowNumbers: PropTypes.bool,
  cellClassName: PropTypes.string,
  cellContentClassName: PropTypes.string,
  className: PropTypes.string,
  columnProps: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  disableDeleteOperation: PropTypes.bool,
  disableEditOperation: PropTypes.bool,
  disableRefreshOperation: PropTypes.bool,
  disableSearchOperation: PropTypes.bool,
  headerClassName: PropTypes.string,
  onPageChange: PropTypes.func,
  onRefresh: PropTypes.func,
  onRequestDelete: PropTypes.func,
  onRequestEdit: PropTypes.func,
  onSort: PropTypes.func,
  operationCellClassName: PropTypes.string,
  operationHeaderClassName: PropTypes.string,
  paginationDisabledPageClassName: PropTypes.string,
  paginationPageClassName: PropTypes.string,
  paginationSelectedPageClassName: PropTypes.string,
  renderPagination: PropTypes.func,
  rowClassName: PropTypes.string,
  rowsPerPage: PropTypes.number,
  showPagination: PropTypes.bool,
  sortedBy: PropTypes.string,
  sortedDirAsc: PropTypes.bool,
  tooltipArrowClassName: PropTypes.string,
  tooltipBodyClassName: PropTypes.string,
  tooltipClassName: PropTypes.string,
  title: PropTypes.string,
};

export default AimoTable;
