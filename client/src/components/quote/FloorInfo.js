import React from "react";
import { Link } from "react-router-dom";

export default function FloorInfo({ quote }) {
  const { floorType, baseColor, colorsFlake, colorComment } = quote.floor || {};
  return (
    <div className="floorInfo">
      <div className="row mb-3">
        <div className="col">
          <h3>Selected Floor Options</h3>
        </div>

        <div className="col text-right">
          <Link to={`/quotes/${quote._id}/floorOptions`} className="jobInfoLink btn btn-primary">
            Change Selections
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="jobInfoItem col">
          <strong>Floor Type: </strong> <span>{floorType}</span>
        </div>
        <div className="jobInfoItem col">
          <strong>Base Color: </strong> <span style={{ color: baseColor }}>{baseColor}</span>
        </div>
        <div className="jobInfoItem col">
          <strong>Flake Color: </strong> <span style={{ color: colorsFlake }}>{colorsFlake}</span>
        </div>
      </div>

      <div className="jobInfoNotesItem">
        <h5>Floor Comments</h5>
        <p>{colorComment || "No Comments"}</p>
      </div>
    </div>
  );
}
