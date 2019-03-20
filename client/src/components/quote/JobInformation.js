import React from "react";
import { Link } from "react-router-dom";

export default function JobInformation({ quote }) {
  const {
    squareFootage,
    concreteHardness,
    verticalSurface,
    hardnessComments,
    crackingComments,
    verticalSurfaceComments,
    conditions,
    cracking,
  } = quote.job || {};

  return (
    <div className="jobInfo">
      <div className="row mb-3">
        <div className="col-sm-12 col-md-6">
          <h3>Job Information </h3>
        </div>

        <div className="col text-md-right">
          <Link
            to={`/quotes/${quote._id}/jobInfo`}
            className="jobInfoLink btn btn-primary"
          >
            Edit Job Info
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Square Footage: </strong> <span>{squareFootage || 0}</span>
        </div>
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Concrete Hardness: </strong>{" "}
          <span>{concreteHardness ? "Yes" : "No"}</span>
        </div>
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Cracking? </strong> <span>{cracking ? "Yes" : "No"}</span>
        </div>
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Vertical Surface? </strong>
          <span>{verticalSurface ? "Yes" : "No"}</span>
        </div>
      </div>

      <div className="jobInfoNotesItem">
        <h5>Concrete Hardness Comments</h5>
        <p>{hardnessComments || "No comments."}</p>
      </div>

      <div className="jobInfoNotesItem">
        <h5>Cracking Comments</h5>
        <p>{crackingComments || "No comments."}</p>
      </div>

      <div className="jobInfoNotesItem">
        <h5>Vertical Surface Comments</h5>
        <p>{verticalSurfaceComments || "No comments."}</p>
      </div>

      <div className="jobInfoNotesItem">
        <h5>Garage Floor Conditions</h5>
        <p>{conditions || "No comments."}</p>
      </div>
    </div>
  );
}
