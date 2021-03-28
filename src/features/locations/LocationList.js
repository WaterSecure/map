import React from "react";
import LocationCard from "./LocationCard";
import { urlify_location } from "../../utils";
import { connect } from "react-redux";
import {
  filteredLocationsSelector,
  openModal,
  setActiveLocation,
} from "./locationSlice";
import { push } from "connected-react-router";
import { fetchData } from "./fetchData";

class LocationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }
  openModal = (location) => {
    return () => {
      this.props.push(`/${urlify_location(location.title)}`);
      // this.props.openModal();
      // this.props.setActiveLocation(location);
    };
  };

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    let locationCards = this.props.locations.map((location) => {
      return (
        <div
          key={location.id}
          style={{ cursor: "pointer" }}
          onClick={this.openModal(location)}
        >
          <LocationCard location={location} />
        </div>
      );
    });

    return <div className={"location-cards"}>{locationCards}</div>;
  }
}

function mapStateToProps(state) {
  return { locations: filteredLocationsSelector(state) };
}

export default connect(mapStateToProps, {
  push,
  openModal,
  setActiveLocation,
  fetchData,
})(LocationList);
// export default Cards;
