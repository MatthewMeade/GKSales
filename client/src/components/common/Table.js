import React, { Component } from "react";
import Spinner from "./Spinner";

// Renders a tabel given data and sort/filter options
export default class Table extends Component {
  filterSortItems() {
    // Filter and sort options
    const filter = this.props.filter;
    const { sortBy, sortDir, sortMethod } = this.props;

    let { data } = this.props;

    // Apply filter if one is provided
    if (filter) {
      if (typeof filter === "string") {
        // Filter by string value
        data = this.filterItems(data, filter.toLowerCase());
      } else if (typeof filter === "function") {
        // Filter using provided function
        data = data.filter(filter);
      } else {
        // Filter by multiple strings
        filter.forEach(f => (data = this.filterItems(data, f.toLowerCase())));
      }
    }

    // Sort data if sortyBy was provided
    if (sortBy) data = this.sortItems(data, sortBy, sortDir, sortMethod.toLowerCase());

    return data;
  }

  // Filter data by string
  filterItems(data, str) {
    return data.filter(item => {
      const itemStr = JSON.stringify(item).toLowerCase();
      return itemStr.indexOf(str) >= 0;
    });
  }

  // Sort array of data
  sortItems(data, sortBy, sortDir = "asc", sortMethod = "string") {
    return data.sort((a, b) => {
      let itemA = a[sortBy];
      let itemB = b[sortBy];

      if (sortMethod === "date") {
        itemA = Date.parse(itemA);
        itemB = Date.parse(itemB);
      } else if (this.props.sortMethod === "number") {
        itemA = parseFloat(itemA);
        itemB = parseFloat(itemB);
      } else {
        itemA = itemA.toString().toLowerCase();
        itemB = itemB.toString().toLowerCase();
      }

      return (itemA < itemB ? -1 : 1) * (sortDir === "asc" ? 1 : -1);
    });
  }

  // Render headings based on provided data mapping
  renderHeading() {
    const { headings } = this.props;

    return (
      <thead>
        <tr>
          {headings.map(heading => (
            <th key={heading.name}> {heading.label} </th>
          ))}
        </tr>
      </thead>
    );
  }

  // Render data
  renderBody() {
    const { headings, loading } = this.props;

    if (loading) {
      return (
        <tbody>
          <tr>
            <td colSpan="4">
              <Spinner className="spinner" />
            </td>
          </tr>
        </tbody>
      );
    }

    const filteredData = this.filterSortItems();

    // Check if no data after filter
    if (filteredData.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={headings.length} style={{ textAlign: "center" }}>
              No Data
            </td>
          </tr>
        </tbody>
      );
    }

    // Render table
    return (
      <tbody>
        {filteredData.map(item => {
          return (
            <tr key={item._id} onClick={() => this.props.onRowClick(item)}>
              {headings.map(heading => this.renderCell(item, heading.name))}
            </tr>
          );
        })}
      </tbody>
    );
  }

  // Render a cell using custom format function if one was provided
  renderCell(item, heading) {
    const format = this.props.format[heading];
    if (format) {
      return <td key={heading + item}>{format(item[heading])}</td>;
    }

    return <td key={heading + item}>{item[heading]}</td>;
  }

  render() {
    return (
      <table className="dataTable table table-striped table-light table-hover">
        {this.renderHeading()}
        {this.renderBody()}
      </table>
    );
  }
}

Table.defaultProps = {
  format: {},
  onRowClick: () => {},
};
