import React from "react";
import { Link } from "react-router-dom";

export default function JobInformation({ quote, hideBtn, hideNotes }) {
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

        {!hideBtn && (
          <div className="col text-md-right">
            <Link to={`/quotes/${quote._id}/jobInfo`} className="jobInfoLink btn btn-primary">
              Edit Job Info
            </Link>
          </div>
        )}
      </div>

      <div className="row">
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Square Footage: </strong> <span>{squareFootage || 0}</span>
        </div>
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Concrete Hardness: </strong> <span>{concreteHardness}</span>
        </div>
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Cracking? </strong> <span>{cracking ? "Yes" : "No"}</span>
        </div>
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Vertical Surface? </strong>
          <span>{verticalSurface ? "Yes" : "No"}</span>
        </div>
      </div>

      {!hideNotes && (
        <div>
          <div className="jobInfoNotesItem">
            <h5>Concrete Hardness Comments</h5>
            <p>{hardnessComments || "No Comments."}</p>
          </div>

          <div className="jobInfoNotesItem">
            <h5>Cracking Comments</h5>
            <p>{crackingComments || "No Comments."}</p>
          </div>

          <div className="jobInfoNotesItem">
            <h5>Vertical Surface Comments</h5>
            <p>{verticalSurfaceComments || "No Comments."}</p>
          </div>

          <div className="jobInfoNotesItem">
            <h5>Garage Floor Conditions</h5>
            <p>{conditions || "No Comments."}</p>
          </div>
        </div>
      )}
    </div>
  );
}
