import React from "react";
import { Link } from "react-router-dom";

export default function PricingInfo({ quote }) {
  // const { floorType, baseColor, colorsFlake, colorComment } = quote.floor || {};
  return (
    <div className="pricing">
      <div className="row mb-3">
        <div className="col">
          <h3>Pricing</h3>
        </div>

        <div className="col text-right">
          <Link to={`/quotes/${quote._id}/pricing`} className="jobInfoLink btn btn-primary">
            Change Pricing
          </Link>
        </div>
      </div>

      <code style={{ whiteSpace: "pre" }}>{JSON.stringify(quote.pricing, null, 2)}</code>
      {/* <div className="row">
        <div className="jobInfoItem col">
          <strong>Floor Type: </strong> <span>{floorType}</span>
        </div>
        <div className="jobInfoItem col">
          <strong>Base Color: </strong> <span style={{ color: baseColor }}>{baseColor}</span>
        </div>
        <div className="jobInfoItem col">
          <strong>Flake Color: </strong> <span style={{ color: colorsFlake }}>{colorsFlake}</span>
        </div>
      </div> */}

      {/* <div className="jobInfoNotesItem">
        <h5>Floor Comments</h5>
        <p>{colorComment || "No Comments"}</p>
      </div> */}
    </div>
  );
}
