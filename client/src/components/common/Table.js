import React, { Component } from "react";
import Spinner from "./Spinner";

export default class Table extends Component {
  filterSortItems() {
    const filter = this.props.filter;
    const { sortBy, sortDir, sortMethod } = this.props;

    console.log(filter);

    let { data } = this.props;

    if (filter) {
      if (typeof filter === "string") data = this.filterItems(data, filter.toLowerCase());
      else filter.forEach(f => (data = this.filterItems(data, f.toLowerCase())));
    }

    if (sortBy) data = this.sortItems(data, sortBy, sortDir, sortMethod.toLowerCase());

    return data;
  }

  filterItems(data, str) {
    return data.filter(item => {
      const itemStr = JSON.stringify(item).toLowerCase();
      return itemStr.indexOf(str) >= 0;
    });
  }

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

  renderBody() {
    const { data, headings, loading } = this.props;

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
