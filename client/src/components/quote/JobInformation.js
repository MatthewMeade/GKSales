import React from "react";
import { Link } from "react-router-dom";

export default function JobInformation({ quote }) {
  if (!quote.job) {
    return <h4>No Job Information Attached</h4>;
  }
  const {
    squareFootage,
    concreteHardness,
    verticalSurface,
    hardnessComments,
    crackingComments,
    verticalSurfaceComments,
    conditions,
  } = quote.job;
  return (
    <div className="jobInfo">
      <div className="row mb-3">
        <div className="col">
          <h3>Job Information </h3>
        </div>

        <div className="col text-right">
          <Link to={`/quotes/${quote._id}/jobInfo`} class="jobInfoLink btn btn-primary">
            Edit Job Info
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="jobInfoItem col">
          <strong>Square footage: </strong> <span>{squareFootage}</span>
        </div>
        <div className="jobInfoItem col">
          <strong>Concrete Hardness: </strong> <span>{concreteHardness}</span>
        </div>
        <div className="jobInfoItem col">
          <strong>Vertical Surface?: </strong> <span>{verticalSurface ? "Yes" : "No"}</span>
        </div>
      </div>

      <div className="jobInfoNotesItem">
        <h5>Concrete Hardness Comments</h5>
        <p>{hardnessComments}</p>
      </div>

      <div className="jobInfoNotesItem">
        <h5>Cracking Comments</h5>
        <p>{crackingComments}</p>
      </div>

      <div className="jobInfoNotesItem">
        <h5>Vertical Surface Comments</h5>
        <p>{verticalSurfaceComments}</p>
      </div>

      <div className="jobInfoNotesItem">
        <h5>Garage Floor Conditions</h5>
        <p>{conditions}</p>
      </div>
    </div>
  );
}
