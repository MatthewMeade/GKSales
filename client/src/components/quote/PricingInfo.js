import React from "react";
import { Link } from "react-router-dom";

export default function PricingInfo({ quote }) {
  const { squareFootage } = quote.job || {};
  const { pricePerSqft, additionalCosts } = quote.pricing || {};

  const hasAdditional = additionalCosts && additionalCosts.length > 0;

  const additionalCostRows =
    hasAdditional &&
    additionalCosts.map(cost => (
      <tr key={cost.id}>
        <td>{cost.name}</td>
        <td>{cost.isPerSqft ? "Per Sqft" : "Flat"}</td>
        <td>${cost.price.toFixed(2)}</td>
      </tr>
    ));

  const additionalCostTable = hasAdditional && (
    <div>
      <h4 className="mt-4">Additional Costs:</h4>

      <table className="table is-fullwidth  priceTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Cost</th>
          </tr>
        </thead>

        <tbody>{additionalCostRows}</tbody>
      </table>
    </div>
  );

  return (
    <div className="pricing">
      <div className="row mb-3">
        <div className="col-md">
          <h3>Pricing: ${totalPrice(pricePerSqft, squareFootage, additionalCosts).toFixed(2)}</h3>
        </div>

        <div className="col-md text-md-right">
          <Link to={`/quotes/${quote._id}/pricing`} className="jobInfoLink btn btn-primary">
            Change Pricing
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="infoItem col-lg-3 col-sm-6">
          <strong>Price / Sqft: </strong> <span>${parseFloat(pricePerSqft).toFixed(2)}</span>
        </div>
      </div>

      {additionalCostTable}
    </div>
  );
}

function totalPrice(pricePerSqft, sqft, additionalCosts) {
  const floorPrice = pricePerSqft * sqft;

  if (!additionalCosts || additionalCosts.length === 0) {
    return floorPrice;
  }

  const additionalPrice = additionalCosts.reduce((total, cost) => {
    if (cost.isPerSqft) {
      return total + cost.price * sqft;
    }
    return total + cost.price;
  }, 0);

  return floorPrice + additionalPrice;
}
