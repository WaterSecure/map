import React from "react";
import { connect } from "react-redux";
import "./Spinner.css";

class Spinner extends React.Component {
  render() {
    return this.props.spinning ? (
      <div className={"overlay"}>
        <div className={"spinner"} />
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return { spinning: state.location.loading };
}

export default connect(mapStateToProps)(Spinner);
