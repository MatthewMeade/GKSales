import React from "react";

const QuoteFormSaveBtns = ({ currentPage, onSaveBtnPressed }) => {
  return (
    <div>
      <h4 className="text-center mt-5 mb-3">
        <i className="far fa-save" /> Save
      </h4>
      <p className="btn btn-primary w-100 mb-3" onClick={() => onSaveBtnPressed("")}>
        <i className="fas fa-check pr-2" /> Return to Quote
      </p>

      <div className="row">
        {currentPage !== "details" && (
          <div className="col-sm-4">
            <p className="btn btn-primary w-100" onClick={() => onSaveBtnPressed("details")}>
              Quote Details <i className=" pl-2 fas fa-arrow-right" />
            </p>
          </div>
        )}

        {currentPage !== "floorOptions" && (
          <div className="col-sm-4">
            <p className="btn btn-primary w-100" onClick={() => onSaveBtnPressed("floorOptions")}>
              Floor Options <i className=" pl-2 fas fa-arrow-right" />
            </p>
          </div>
        )}

        {currentPage !== "jobInfo" && (
          <div className="col-sm-4">
            <p className="btn btn-primary w-100" onClick={() => onSaveBtnPressed("jobInfo")}>
              Job Info <i className=" pl-2 fas fa-arrow-right" />
            </p>
          </div>
        )}

        {currentPage !== "pricing" && (
          <div className="col-sm-4">
            <p className="btn btn-primary w-100" onClick={() => onSaveBtnPressed("pricing")}>
              Pricing
              <i className=" pl-2 fas fa-arrow-right" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteFormSaveBtns;
