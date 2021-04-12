import React from "react";
import "./LocationSidebar.css";
import { Link } from "react-router-dom";

function LocationSidebar() {
  return (
    <div className="sidebar location">
      <Link to="/">Hello</Link>
    </div>
  );
}

export default LocationSidebar;
