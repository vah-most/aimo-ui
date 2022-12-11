/*
 * Created on Sat Nov 05 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import AimoTable from "@aimo.ui/aimo-table";

import { generateTableData } from "./FakeTableData";

import "./DemoTable.scss";

const demoColumnProps = {
  name: {
    cellClassName: "demoColumnName",
    headerClassName: "demoColumnName",
    headerTitle: "Name",
    isSortable: true,
  },
  lastname: {
    cellClassName: "demoColumnLastname",
    headerClassName: "demoColumnLastname",
    headerTitle: "Lastname",
    isSortable: true,
  },
  email: {
    cellClassName: "demoColumnEmail",
    headerClassName: "demoColumnEmail",
    headerTitle: "Email",
    isSortable: true,
  },
};

class DemoTable extends React.Component {
  state = {
    data: [],
  };

  rowsPerPage = 8;
  pageCount = 1;

  componentDidMount() {
    /*
     * Gets sample-data in format of {name: '...', lastname: '...', email: '...'}
     */
    const data = generateTableData();
    this.pageCount = Math.ceil(data.length / this.rowsPerPage);

    this.setState({ data });
  }

  getCurrentPageData = (data) => {
    const { currentPage } = this.state;

    const startIndex = (currentPage - 1) * this.rowsPerPage;
    const filteredData = data.slice(startIndex, startIndex + this.rowsPerPage);
    return [...filteredData];
  };

  handleRequestDelete = (row) => {
    let data = [...this.state.data];

    data = data.filter((dataRow) => dataRow.id !== row.id);

    this.setState({ data });
  };

  render() {
    const { data } = this.state;

    return (
      <AimoTable
        autoAddRowNumbers={true}
        cellClassName="demoTableCell"
        columnProps={demoColumnProps}
        data={data}
        disableDeleteOperation={false}
        disableRefreshOperation={false}
        disableSearchOperation={false}
        onRequestDelete={this.handleRequestDelete}
        rowsPerPage={this.rowsPerPage}
        title="Member List"
      />
    );
  }
}

export default DemoTable;
