import React from "react";
import ReactPaginate from "react-paginate";

const AppPagination = ({ onPageChange, pageCount }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageCount={pageCount}
      pageRangeDisplayed={5}
      previousLabel="<"
      renderOnZeroPageCount={null}
      activeClassName="active"
      containerClassName="pagination justify-content-left"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
    />
  );
};

export default AppPagination;
