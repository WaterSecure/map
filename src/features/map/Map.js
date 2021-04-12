import React from "react";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import {
  allCategoriesSelector,
  filteredLocationsAsGeoJSONSelector,
} from "../locations/locationSlice";
import * as utils from "../../utils";
import memoizeOne from "memoize-one";
import "./Map.css";
import { withRouter } from "react-router-dom";

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

function loadLocations(map, locations) {
  map.getSource("locations").setData(locations);
}

function loadCategories(map, categories) {
  for (let category of categories) {
    utils.generatePinIcon(category.color).then((image) => {
      try {
        map.addImage(`${category.id}-icon`, image);
      } catch (e) {}
    });
  }
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

const memoizedLoadLocations = memoizeOne(
  loadLocations,
  (newArgs, lastArgs) => newArgs.locations === lastArgs.locations
);

// const memoizedLoadCategories = memoizeOne(
//   loadCategories,
//   (newArgs, lastArgs) => newArgs.categories === lastArgs.categories
// );

let Map = class Map extends React.Component {
  mapRef = React.createRef();
  map;

  nextPath(path) {
    this.props.history.push(path);
  }

  componentDidUpdate() {
    // try {
    //   memoizedLoadCategories(this.map, this.props.categories);
    // } catch (e) {}
    try {
      memoizedLoadLocations(this.map, this.props.data);
    } catch (e) {}
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
      center: this.props.center,
      zoom: this.props.zoom,
      pitch: this.props.pitch,
    });

    this.map.on("load", () => {
      console.log(this.props.data);
      var el = document.createElement("div");
      el.className = "marker";
      el.onclick = (e) => {
        console.log(e);
        this.nextPath("/1");
      };

      new mapboxgl.Marker(el)
        .setLngLat([-113.496548, 53.511435])
        .addTo(this.map);

      var el = document.createElement("div");
      el.className = "marker";
      el.onclick = (e) => {
        console.log(e);
        this.nextPath("/2");
      };

      new mapboxgl.Marker(el)
        .setLngLat([-113.496548, 53.611435])
        .addTo(this.map);

      // this.map.addSource("locations", {
      //   type: "geojson",
      //   data: this.props.data,
      // });

      // this.map.addLayer({
      //   id: "locations",
      //   type: "symbol",
      //   source: "locations",
      //   layout: {
      //     "icon-image": ["concat", ["get", "category_id"], "-icon"],
      //     "icon-allow-overlap": true,
      //     "icon-anchor": "bottom",
      //   },
      // });
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
    data: filteredLocationsAsGeoJSONSelector(state),
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

Map = connect(mapStateToProps)(Map);

export default withRouter(Map);
