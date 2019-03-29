import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="404Page">
    <h1>Not Found</h1>
    <p>The URL you requested does not exist or has been removed</p>
    <Link className="btn btn-primary" to="/dashboard">
      Return to Dashboard
    </Link>
  </div>
);

export default NotFound;
