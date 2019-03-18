import React from "react";

export default function JobInformation({ quote }) {
  return (
    <div style={{ marginBottom: "200px" }}>
      <h3>Job Information</h3>
      <code>{JSON.stringify(quote.job, null, 2)}</code>
    </div>
  );
}
