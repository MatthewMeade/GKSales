import React from "react";
import { Link } from "react-router-dom";

export default function FloorInfo({ quote }) {
  const { floorType, baseColor, colorsFlake, colorComment } = quote.floor || {};
  return (
    <div className="floorInfo">
      <div className="row mb-3">
        <div className="col-md">
          <h3>Floor Options</h3>
        </div>

        <div className="col-md text-md-right">
          <Link
            to={`/quotes/${quote._id}/floorOptions`}
            className="jobInfoLink btn btn-primary"
          >
            Edit Options
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Floor Type: </strong> <span>{floorType}</span>
        </div>
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Base Color: </strong>{" "}
          <span style={{ color: baseColor }}>{baseColor}</span>
        </div>
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Flake Color: </strong>{" "}
          <span style={{ color: colorsFlake }}>{colorsFlake}</span>
        </div>
      </div>

      <div className="jobInfoNotesItem">
        <h5>Floor Comments</h5>
        <p>{colorComment || "No comments."}</p>
      </div>
    </div>
  );
}
