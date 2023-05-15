/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useEffect, useState } from "react";
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
  disableExportOperation = true,
  disableRefreshOperation = true,
  disableSearchOperation = true,
  exportFileName = null,
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
  renderEmptyTableText = null,
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
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

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
        if (typeof columnProps[key] === "undefined") continue;

        if (
          typeof columnProps[key].searchFunc === "function" &&
          columnProps[key].searchFunc(row, search)
        )
          return true;

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

  const handleSearchTextChange = (text) => {
    if (currentPage > 1) {
      setTableData([]);
      setTimeout(() => {
        setTableData(data);
      });
      handlePageChange(1);
    }
    setSearchText(text);
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

  const prepareValueToExport = (value) => {
    let innerValue = value === null || !value.toString ? "" : value.toString();
    if (value instanceof Date) {
      innerValue = value.toLocaleString();
    }
    let result = innerValue.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
    return result;
  };

  const handleExport = () => {
    let dataHeader = Object.values(columnProps).map((col) => col.headerTitle);

    if (addDataRowNumber) dataHeader.unshift("#");
    let finalData = data;
    if (!disableSearchOperation) {
      finalData = filterData(finalData);
    }
    let csvRows = finalData.map((row, index) => {
      let rowItems = [];
      if (addDataRowNumber) rowItems.push(index + 1);
      Object.entries(columnProps).forEach(([keyName, column], cIndex) => {
        const value = column.exportableValue
          ? column.exportableValue(row)
          : row[keyName] && typeof row[keyName].toString !== "undefined"
          ? row[keyName].toString()
          : null;
        rowItems.push(prepareValueToExport(value));
      });
      return rowItems.join(",");
    });
    csvRows.unshift(
      dataHeader.map((value) => prepareValueToExport(value)).join(",")
    );

    const csv = csvRows.join("\n");
    const filename = exportFileName
      ? typeof exportFileName === "function"
        ? exportFileName()
        : exportFileName
      : `export-${new Date().toLocaleString()}.csv`;

    const link = document.createElement("a");
    if (link.download !== undefined) {
      link.setAttribute(
        "href",
        `data:text/csv;charset=utf-8,%EF%BB%BF` + encodeURIComponent(csv)
      );
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      link.click();
    }
  };

  let finalData = tableData;
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
  const columnCount =
    Object.entries(columnProps).length +
    (autoAddRowNumbers ? 1 : 0) +
    (!disableDeleteOperation || !disableEditOperation ? 1 : 0);

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
                onChange={handleSearchTextChange}
              />
            )}
            {!disableRefreshOperation && (
              <div className="titleRefresh" onClick={onRefresh}>
                <img alt="↺" className="titleRefreshIcon" src={RefreshIcon} />
              </div>
            )}
            {!disableExportOperation && (
              <div className="titleExport" onClick={handleExport}>
                <span className="titleExportIcon">🖶</span>
              </div>
            )}
          </div>
        </div>
      )}
      <table>
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
          {data.length === 0 && renderEmptyTableText && (
            <tr>
              <td colSpan={columnCount}>{renderEmptyTableText()}</td>
            </tr>
          )}
          {finalData.map((row, index) => {
            return (
              <tr key={index} className={`${rowClassName}`}>
                {autoAddRowNumbers && (
                  <td
                    className={`itemCell centeredText ${cellClassName} rowNumberCell`}
                  >
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
                            arrowPosition="center"
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
  disableExportOperation: PropTypes.bool,
  disableRefreshOperation: PropTypes.bool,
  disableSearchOperation: PropTypes.bool,
  exportFileName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
  renderEmptyTableText: PropTypes.func,
  renderPagination: PropTypes.func,
  rowClassName: PropTypes.string,
  rowsPerPage: PropTypes.number,
  showPagination: PropTypes.bool,
  sortedBy: PropTypes.string,
  sortedDirAsc: PropTypes.bool,
  tooltipArrowClassName: PropTypes.string,
  tooltipBodyClassName: PropTypes.string,
  tooltipClassName: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default AimoTable;
