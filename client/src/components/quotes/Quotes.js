import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getQuotes } from "../../actions/quoteActions";

import { withRouter } from "react-router-dom";

class Quote extends Component {
  componentDidMount() {
    this.props.getQuotes();
  }

  onDeleteClick = () => {
    this.props.refreshquote();
  };

  onRowClick = id => {
    this.props.history.push("/quote/" + id);
  };

  render() {
    const { quotes, loading } = this.props;
    let quoteContent;

    console.log(loading);

    if (!quotes || loading) {
      quoteContent = (
        <tr>
          <td colSpan="4">
            <Spinner className="spinner" />
          </td>
        </tr>
      );
    } else {
      quoteContent = quotes.map(quote => (
        // Can't wrap tr in Link, using onRowClick instead
        <tr key={quote._id} onClick={this.onRowClick.bind(this, quote._id)}>
          <td>{quote.lead}</td>
          <td>{quote.consultationDate}</td>
        </tr>
      ));
    }

    return (
      <div className="quoteList">
        <h3>Quotes</h3>

        <table className="table table-striped table-light table-hover">
          <thead>
            <tr>
              <th>Lead</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{quoteContent}</tbody>
        </table>
      </div>
    );
  }
}

Quote.propTypes = {
  quotes: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  quotes: state.quote.quotes,
  loading: state.quote.loading,
});

export default withRouter(
  connect(
    mapStateToProps,
    { getQuotes }
  )(Quote)
);
