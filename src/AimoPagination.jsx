/*
 * Created on Tue Jul 05 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import AimoIcon from "./AimoIcon";

import "./AimoPagination.scss";

const AimoPagination = ({
  breakLabel = "...",
  breakContainerClassName = "",
  breakTextClassName = "",
  containerClassName = "",
  nextContainerClassName = "",
  onPageChange = null,
  pageContainerClassName = "",
  pageContainerDisabledClassName = "",
  pageCount = 1,
  pageTextClassName = "",
  prevContainerClassName = "",
  renderNext = null,
  renderOnZeroPage = null,
  renderPrev = null,
  selectedContainerClassName = "",
  selectedTextClassName = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (pageCount <= 0)
    return typeof renderOnZeroPage === "function" ? renderOnZeroPage() : null;

  let visiblePages = [];
  if (pageCount > 1) {
    visiblePages = new Set([1, pageCount]);

    if (pageCount > 4) {
      if (currentPage > 1) visiblePages.add(currentPage - 1);
      visiblePages.add(currentPage);
      if (currentPage < pageCount) visiblePages.add(currentPage + 1);
    }

    visiblePages = Array.from(visiblePages).sort();
  }

  let pages = [
    {
      className: `${pageContainerClassName} ${prevContainerClassName}`,
      disabledClassName: pageContainerDisabledClassName,
      number: 0,
      onClick: () => handlePageChange(currentPage - 1),
      render: renderPrev
        ? (isClickable) => renderPrev(isClickable)
        : (isClickable) => (
            <AimoIcon className={`${pageTextClassName} `} name="caret-left" />
          ),
    },
  ];

  let prevPage = 1;
  visiblePages.forEach((pageNum, index) => {
    if (pageNum - prevPage > 1)
      pages.push({
        className: `${pageContainerDisabledClassName} ${breakContainerClassName}`,
        disabledClassName: pageContainerDisabledClassName,
        number: -1,
        onClick: null,
        text: breakLabel,
        textClassName: breakTextClassName,
      });

    pages.push({
      className: pageContainerClassName,
      disabledClassName: pageContainerDisabledClassName,
      number: pageNum,
      onClick: () => handlePageChange(pageNum),
      text: `${pageNum}`,
      textClassName: pageTextClassName,
    });

    prevPage = pageNum;
  });
  pages.push({
    className: `${pageContainerClassName} ${nextContainerClassName}`,
    disabledClassName: pageContainerDisabledClassName,
    number: pageCount + 1,
    onClick: () => handlePageChange(currentPage + 1),
    render: renderNext
      ? (isClickable) => renderNext(isClickable)
      : (isClickable) => (
          <AimoIcon className={`${pageTextClassName}`} name="caret-right" />
        ),
  });

  const handlePageChange = (page) => {
    if (page < 1 || page > pageCount) return false;

    setCurrentPage(page);
    onPageChange && onPageChange(page);
  };

  const isPageClickable = (page) => {
    if (page === currentPage) return false;
    if (page < 0) return false; // break-cells have page-number equal to -1;
    if (page === 0 && currentPage === 1) return false;
    if (page === pageCount + 1 && currentPage === pageCount) return false;

    return true;
  };

  return (
    <div className={`paginationContainer ${containerClassName}`}>
      {pages.map((page, index) => {
        const isClickable = isPageClickable(page.number);
        return (
          <div
            key={index}
            className={`pageContainer ${
              isClickable
                ? `clickablePageContainer ${page.className}`
                : `${page.disabledClassName}`
            } ${
              currentPage === page.number
                ? `${page.disabledClassName} selectedPageContainer ${selectedContainerClassName}`
                : ""
            }`}
            onClick={isClickable ? page.onClick : null}
          >
            {page.render ? (
              page.render(isClickable)
            ) : (
              <span
                className={`${page.textClassName} ${
                  isPageClickable(page.number) ? "clickablePageText" : ""
                } ${
                  currentPage === page.number
                    ? `selectedPageText ${selectedTextClassName}`
                    : null
                }`}
              >
                {page.text}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

AimoPagination.propTypes = {
  breakLabel: PropTypes.string,
  breakContainerClassName: PropTypes.string,
  breakTextClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  nextContainerClassName: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
  pageContainerClassName: PropTypes.string,
  pageContainerDisabledClassName: PropTypes.string,
  pageCount: PropTypes.number.isRequired,
  pageTextClassName: PropTypes.string,
  prevContainerClassName: PropTypes.string,
  renderNext: PropTypes.func,
  renderOnZeroPage: PropTypes.func,
  renderPrev: PropTypes.func,
  selectedContainerClassName: PropTypes.string,
  selectedTextClassName: PropTypes.string,
};

export default AimoPagination;
