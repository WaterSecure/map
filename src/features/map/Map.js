import React from "react";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import {
  allCategoriesSelector,
  allLocationsSelector,
  setActiveLocation,
} from "../locations/locationSlice";
import * as utils from "../../utils";
import memoizeOne from "memoize-one";
import "./Map.css";
import { withRouter } from "react-router-dom";
import { community_icon, water_source_icon } from "../../icons";
import { urlify_location } from "../../utils";
mapboxgl.accessToken =
  "pk.eyJ1IjoieHJlbmRhbiIsImEiOiJjamlubXdoeDgwZDF5M3BvNzl1Nm51ZTF2In0.cRp5pTHYfVlg5Qfhh9npmg";

function centerMap(map, center) {
  map.jumpTo({ center: center });
}
function zoomMap(map, zoom) {
  map.jumpTo({ zoom: zoom });
}
function pitchMap(map, pitch) {
  map.jumpTo({ pitch: pitch });
}

//memoize map centering to ensure it only changes on center props update
const memoizedCenterMap = memoizeOne(
  centerMap,
  (newArgs, lastArgs) => newArgs.center === lastArgs.center
);

const memoizedZoomMap = memoizeOne(
  zoomMap,
  (newArgs, lastArgs) => newArgs.zoom === lastArgs.zoom
);

const memoizedPitchMap = memoizeOne(
  pitchMap,
  (newArgs, lastArgs) => newArgs.pitch === lastArgs.pitch
);

let Map = class Map extends React.Component {
  mapRef = React.createRef();
  map;
  state = {
    markers: [],
  };

  nextPath(path) {
    this.props.history.push(path);
  }
  memoizedLoadLocations = memoizeOne(
    this.loadLocations,
    (newArgs, lastArgs) => newArgs.locations === lastArgs.locations
  );
  loadLocations(locations) {
    this.state.markers.forEach((marker) => {
      marker.remove();
    });
    let markers = [];
    locations.forEach((location) => {
      console.log(location);
      let el = document.createElement("div");
      el.className = "community";
      el.id = `community-${location.id}`;
      el.innerHTML = community_icon;
      el.onclick = (e) => {
        console.log(e);
        this.props.setActiveLocation(location);
        this.nextPath(`/${urlify_location(location.title)}`);
      };
      let popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: "bottom",
        offset: 60,
      });
      el.onmouseenter = (e) => {
        popup
          .setLngLat(location.coordinates)
          .setHTML(location.title)
          .addTo(this.map);
      };

      el.onmouseleave = (e) => {
        popup.remove();
      };

      const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat(location.coordinates)
        .addTo(this.map);
      markers.push(marker);

      location.water_sources.forEach((water_source) => {
        let el = document.createElement("div");
        el.className = `water-source water-source-${urlify_location(
          location.title
        )}`;
        el.innerHTML = water_source_icon;
        el.onmouseenter = (e) => {
          popup
            .setLngLat(water_source.coordinates)
            .setHTML(water_source.name)
            .addTo(this.map);
        };

        el.onmouseleave = (e) => {
          popup.remove();
        };
        const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(water_source.coordinates)
          .addTo(this.map);
        markers.push(marker);
      });
      this.setState({
        markers: markers,
      });
    });
  }

  componentDidUpdate() {
    this.memoizedLoadLocations(this.props.locations);
    try {
      memoizedCenterMap(this.map, this.props.center);
    } catch (e) {
      console.log(e);
      throw e;
    }
    try {
      memoizedZoomMap(this.map, this.props.zoom);
    } catch (e) {}
    try {
      memoizedPitchMap(this.map, this.props.pitch);
    } catch (e) {}
  }
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/streets-v9",
      customAttribution: "Icons by fjstudio & Freepik on Flaticon",
      center: this.props.center,
      zoom: this.props.zoom,
      pitch: this.props.pitch,
    });

    this.map.on("load", () => {
      this.loadLocations(this.props.locations);
    });
    let popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      anchor: "bottom",
      offset: 40,
    });
    this.map.on("mouseenter", "locations", (e) => {
      // TODO: action on hover
      this.props.onHover(e);

      this.map.getCanvas().style.cursor = "pointer";

      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.title;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
    });

    this.map.on("click", "locations", (e) => {
      this.props.onClick(e);
    });

    this.map.on("mouseleave", "locations", (e) => {
      this.map.getCanvas().style.cursor = "";
      popup.remove();
      this.props.onMouseLeave(e);
    });
  }

  render() {
    return (
      <div
        ref={this.mapRef}
        style={{
          height: "100%",
        }}
      />
    );
  }
};

function getBackgroundCSS(elementID, pinColour) {
  let backgroundColor = utils.lightenColor(pinColour, 175);
  return `#${elementID} { background-color: ${backgroundColor};}`;
}

function mapStateToProps(state) {
  let categories = allCategoriesSelector(state);
  return {
    center: state.metadata.initial_map_center,
    zoom: state.metadata.initial_map_zoom,
    pitch: state.metadata.initial_map_pitch,
    categories: allCategoriesSelector(state),
    locations: allLocationsSelector(state),
    // TODO: pull out of Map
    onHover: (e) => {
      let locationHtmlId = `location-${e.features[0].properties.id}`;
      let elmnt = document.getElementById(locationHtmlId);
      if (elmnt !== null) {
        elmnt.scrollIntoView({ behavior: "smooth" });
      }
      let style = document.getElementById("hover-style");
      style.appendChild(
        document.createTextNode(
          getBackgroundCSS(
            locationHtmlId,
            categories.find(
              (category) => category.id === e.features[0].properties.category_id
            ).color
          )
        )
      );
    },
    onMouseLeave: () => {
      let style = document.getElementById("hover-style");
      style.textContent = "";
    },
    onClick: (e) => {
      // TODO: Make this not so hacky
      let elmnt = document.getElementById(
        `location-${e.features[0].properties.id}`
      );
      if (elmnt !== null) {
        elmnt.click();
      }
    },
  };
}

Map = connect(mapStateToProps, { setActiveLocation })(Map);

export default withRouter(Map);
