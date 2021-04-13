import React, { useState } from "react";
import "./LocationSidebar.css";
import { Link } from "react-router-dom";
import BackArrow from "./left-arrow.svg";
import { connect } from "react-redux";
import { activeLocationSelector } from "./locationSlice";

const RISK_MAPPING = {
  0: "UNAVAILABLE INFORMATION",
  1: "VERY LOW RISK",
  2: "LOW RISK",
  3: "MODERATE RISK",
  4: "HIGH RISK",
  5: "VERY HIGH RISK",
};
const METRIC_MAPPING = {
  "Sources and Availability": {
    0: "UNAVAILABLE INFORMATION",
    1: "VERY HIGH ACCESS",
    2: "HIGH ACCESS",
    3: "MODERATE ACCESS",
    4: "LOW ACCESS",
    5: "VERY LOW ACCESS",
  },
  "Consumption and Usage": {
    0: "UNAVAILABLE INFORMATION",
    1: "VERY LOW CONSUMPTION",
    2: "LOW CONSUMPTION",
    3: "MODERATE CONSUMPTION",
    4: "HIGH CONSUMPTION",
    5: "VERY HIGH CONSUMPTION",
  },
  "Infrastructure and Distribution": {
    0: "UNAVAILABLE INFORMATION",
    1: "VERY STRONG INFRASTRUCTURE",
    2: "STRONG INFRASTRUCTURE",
    3: "ADEQUATE INFRASTRUCTURE",
    4: "POOR INFRASTRUCTURE",
    5: "VERY POOR INFRASTRUCTURE",
  },
  "Human Health": RISK_MAPPING,
  "Animal Health": RISK_MAPPING,
  "Waterbody Health": RISK_MAPPING,
  "Human Pollution": RISK_MAPPING,
};

function Tab(props) {
  let metricsSections = [];
  for (const [key, value] of Object.entries(props.factors)) {
    metricsSections.push(
      <MetricSection key={key} title={key} metrics={value} />
    );
  }
  return (
    <div className="tab">
      <p>{props.current_analysis}</p>
      {metricsSections}
      <p>{props.future_analysis}</p>
    </div>
  );
}

function Documents() {
  return <div className="documents">Hello</div>;
}

function Metric(props) {
  return (
    <div className="metric">
      <div className={`indicator level-${props.level}`} />
      <div className="metric-text">
        <div className="metric-title">{props.title}</div>
        <div className="metric-value">
          {METRIC_MAPPING[props.section][props.level]}
        </div>
      </div>
    </div>
  );
}

function MetricSection(props) {
  let metrics = [];
  for (const [key, value] of Object.entries(props.metrics)) {
    metrics.push(
      <Metric section={props.title} key={key} title={key} level={value} />
    );
  }

  return (
    <div className="metric-section">
      <h2>{props.title}</h2>
      {metrics}
    </div>
  );
}

function LocationSidebar(props) {
  const [tab, setTab] = useState("Water Security");
  console.log(tab);
  if (!props.location) {
    return <div className="sidebar location-sidebar" />;
  }
  let tabs = props.location.tabs;

  return (
    <div className="sidebar location-sidebar">
      <div className="content">
        <div className="header">
          <h1>
            <Link to="/">
              <img className="backarrow" src={BackArrow} alt="back" />
            </Link>
            {props.location.title}
          </h1>
          <p>
            Population of{" "}
            {props.location.population.toLocaleString("en-US", {
              minimumFractionDigits: 0,
            })}
          </p>
        </div>
        <br />
        <p>{props.location.description}</p>
        <button onClick={() => setTab("Water Security")}>Water Security</button>
        <button onClick={() => setTab("Population Health")}>
          Population Health
        </button>
        <button onClick={() => setTab("Environmental Risks")}>
          Environmental Risks
        </button>

        {tab === "Water Security" ? <Tab {...tabs["Water Security"]} /> : null}

        {tab === "Population Health" ? (
          <Tab {...tabs["Population Health"]} />
        ) : null}

        {tab === "Environmental Risks" ? (
          <Tab {...tabs["Environmental Risks"]} />
        ) : null}
      </div>
      <Documents />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    location: activeLocationSelector(state),
  };
}

export default connect(mapStateToProps)(LocationSidebar);
