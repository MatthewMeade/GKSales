import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export default function QuoteDetails({ quote }) {
  const pricing = quote.pricing || {};
  return (
    <div>
      <div className="row mb-3">
        <div className="col-md">
          <h3 className="">Quote Info</h3>
        </div>
        <div className="col-md text-md-right">
          <Link className="btn btn-primary mt-2" to={`/quotes/${quote._id}/details`}>
            Edit Details
          </Link>
        </div>
      </div>
      <div className="row quoteDetails">
        {quote.lead && (
          <div className="col-lg-4 col-md-6 mb-sm-2">
            <Link to={`/leads/${quote.lead._id}`}>
              <i className="fas fa-user mr-1" />
              <strong>Lead:</strong> {quote.lead.name}
            </Link>
          </div>
        )}
        {quote.salesperson && (
          <div className="col-lg-4 col-md-6 mb-sm-2">
            <i className="far fa-id-badge mr-1" />
            <strong>Salesperson:</strong> {quote.salesperson.name}
          </div>
        )}

        {quote.consultationDate && (
          <div className="col-lg-4 col-md-6 mb-sm-2">
            <i className="fas fa-calendar-alt mr-1" />
            <strong>Date: </strong>
            <Moment format="MMM Do YYYY">{quote.consultationDate}</Moment>
          </div>
        )}

        {quote.address && (
          <div className="col-lg-4 col-md-6 mb-sm-2" style={{ whiteSpace: "pre" }}>
            <strong className="float-left">
              <i className="fas fa-map-marked-alt mr-1" />
            </strong>
            <div className="text-left float-left">{quote.address}</div>
          </div>
        )}

        {pricing.depositPaid && (
          <div className="col-lg-4 col-md-6 mb-sm-2">
            <i className="fas fa-donate mr-1" />
            <strong>Deposit Paid:</strong> {pricing.depositPaid ? "Yes" : "No"}
          </div>
        )}

        {pricing.jobPaid && (
          <div className="col-lg-4 col-md-6 mb-sm-2">
            <i className="fas fa-money-check-alt mr-1" />
            <strong>Job Paid:</strong> {pricing.jobPaid ? "Yes" : "No"}
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
