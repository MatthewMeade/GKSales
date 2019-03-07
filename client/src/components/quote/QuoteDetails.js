import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export default function QuoteDetails({ quote }) {
  return (
    <div>
      <div className="row">
        <div className="col-md">
          <h1 className="mb-2">Quote Details</h1>
        </div>
        <div className="col-md text-md-right">
          <Link className="btn btn-primary mt-2 mb-sm-5" to={`/quotes/${quote._id}/details`}>
            Edit Details
          </Link>
        </div>
      </div>
      <div className="row quoteDetails">
        {quote.lead && (
          <div className="col-lg col-md-6 col-sm-6 mb-sm-2">
            <Link to={`/leads/${quote.lead._id}`}>
              <i className="fas fa-user mr-1" />
              <strong>Lead:</strong> {quote.lead.name}
            </Link>
          </div>
        )}

        {quote.consultationDate && (
          <div className="col-lg col-md-6 col-sm-6 mb-sm-2">
            <i className="fas fa-calendar-alt mr-1" />
            <strong>Date: </strong>
            <Moment format="MMM Do YYYY">{quote.consultationDate}</Moment>
          </div>
        )}

        {quote.address && (
          <div className="col-lg col-md-6 col-sm-6 mb-sm-2" style={{ whiteSpace: "pre" }}>
            <strong className="float-left">
              <i className="fas fa-map-marked-alt mr-1" />
            </strong>
            <div className="text-left float-left">{quote.address}</div>
          </div>
        )}
      </div>

      <div className="quoteNotes mt-5 mb-5">
        <h5>Notes</h5>
        <div>{quote.notes}</div>
      </div>
    </div>
  );
}
