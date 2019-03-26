import React from "react";
import Moment from "react-moment";

import Table from "../common/Table";

function UpcomingQuotes({ quotes, loading, history, auth }) {
  const data = quotes.map(quote => ({
    ...quote,
    leadId: quote.lead._id,
    leadName: quote.lead.name,
  }));

  return (
    <div className="upcommingQuotes mt-3">
      <h4>Upcoming Consultations </h4>
      <Table
        headings={[{ name: "leadName", label: "Lead" }, { name: "consultationDate", label: "Consultation Date" }]}
        data={data}
        format={{
          consultationDate: date => <Moment format="YYYY MMMM DD">{date}</Moment>,
        }}
        sortBy="consultationDate"
        sortMethod="date"
        filter={data => Date.parse(data.consultationDate) > Date.now() && data.salesperson._id == auth.user.id}
        onRowClick={({ _id }) => history.push("/quotes/" + _id)}
      />
    </div>
  );
}

export default UpcomingQuotes;
