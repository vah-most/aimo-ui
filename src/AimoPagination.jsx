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

import "./AimoPagination.scss";

const AimoPagination = ({
  breakLabel = "...",
  breakContainerClassName,
  breakTextClassName,
  containerClassName,
  nextLabel = ">",
  nextContainerClassName,
  nextTextClassName,
  onPageChange,
  previousLabel = "<",
  prevContainerClassName,
  prevTextClassName,
  pageCount,
  renderOnZeroPage = null,
  pageContainerClassName,
  pageTextClassName,
  selectedContainerClassName,
  selectedTextClassName,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (pageCount <= 0)
    return typeof renderOnZeroPage === "function" ? renderOnZeroPage() : null;

  let visiblePages = [];
  if (pageCount > 1) {
    visiblePages = new Set([1, 2, pageCount - 1, pageCount]);

    if (pageCount > 4) {
      if (currentPage > 1) visiblePages.add(currentPage - 1);
      visiblePages.add(currentPage);
      if (currentPage < pageCount) visiblePages.add(currentPage + 1);
    }

    visiblePages = Array.from(visiblePages).sort();
  }

  let pages = [
    {
      className: prevContainerClassName,
      number: 0,
      onClick: () => handlePageChange(currentPage - 1),
      text: previousLabel,
      textClassName: prevTextClassName,
    },
  ];

  let prevPage = 1;
  visiblePages.forEach((pageNum, index) => {
    if (pageNum - prevPage > 1)
      pages.push({
        className: breakContainerClassName,
        number: 0,
        onClick: null,
        text: breakLabel,
        textClassName: breakTextClassName,
      });

    pages.push({
      className: pageContainerClassName,
      number: pageNum,
      onClick: () => handlePageChange(pageNum),
      text: `${pageNum}`,
      textClassName: pageTextClassName,
    });

    prevPage = pageNum;
  });
  pages.push({
    className: nextContainerClassName,
    number: pageCount + 1,
    onClick: () => handlePageChange(currentPage + 1),
    text: nextLabel,
    textClassName: nextTextClassName,
  });

  const handlePageChange = (page) => {
    if (page < 1 || page > pageCount) return false;

    setCurrentPage(page);
    onPageChange && onPageChange(page);
  };

  const isPageClickable = (page) => {
    if (page === currentPage) return false;
    if (page === 0 && currentPage === 1) return false;
    if (page === pageCount + 1 && currentPage === pageCount) return false;

    return true;
  };

  return (
    <div className={`paginationContainer ${containerClassName}`}>
      {pages.map((page, index) => {
        return (
          <div
            key={index}
            className={`pageContainer ${
              currentPage === page.number
                ? `selectedPageContainer ${selectedContainerClassName}`
                : ""
            } ${isPageClickable(page.number) ? "clickablePageContainer" : ""} ${
              page.className
            }`}
            onClick={isPageClickable(page.number) ? page.onClick : null}
          >
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
  nextLabel: PropTypes.string,
  nextContainerClassName: PropTypes.string,
  nextTextClassName: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
  previousLabel: PropTypes.string,
  prevContainerClassName: PropTypes.string,
  prevTextClassName: PropTypes.string,
  pageCount: PropTypes.number.isRequired,
  renderOnZeroPage: PropTypes.func,
  pageContainerClassName: PropTypes.string,
  pageTextClassName: PropTypes.string,
  selectedContainerClassName: PropTypes.string,
  selectedTextClassName: PropTypes.string,
};

export default AimoPagination;
