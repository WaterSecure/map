import React, { useEffect } from "react";

import Map from "./features/map/Map";
import "./App.css";
import UserNav from "./features/Meta/NavBar";
import { Route } from "react-router-dom";
// import Spinner from "./features/locations/Spinner";
import { connect } from "react-redux";
import { fetchMetaData } from "./features/Meta/metaSlice";
import WelcomeSidebar from "./features/Meta/WelcomeSidebar";
import {
  activeLocationSelector,
  fetchLocationData,
  LocationOpener,
} from "./features/locations/locationSlice";
import LocationSidebar from "./features/locations/LocationSidebar";
import { urlify_location } from "./utils";
import Spinner from "./features/locations/Spinner";

function App(props) {
  // Set Title properly
  let { fetchMetaData, fetchLocationData } = props;

  useEffect(() => {
    if (props.currentPath === "") document.title = props.siteName;
  });

  useEffect(() => {
    fetchMetaData();
  }, [fetchMetaData]);

  useEffect(() => {
    fetchLocationData();
  }, [fetchLocationData]);

  return (
    <>
      <nav role="navigation" className="navbar">
        <UserNav />
      </nav>
      <WelcomeSidebar />
      <LocationSidebar />
      <div className="map">{false ? null : <Map />}</div>
      <Spinner />
      <Route
        path="/:locationName"
        render={() => (
          <style
            dangerouslySetInnerHTML={{
              __html: `
              div.location-sidebar { 
                  width: 100%; 
              }
              
              .water-source.water-source-${
                props.location && urlify_location(props.location.title)
              } {
                visibility: visible;
                }
              `,
            }}
          />
        )}
      />
      <LocationOpener />
    </>
  );
}

function mapStateToProps(state) {
  return {
    location: activeLocationSelector(state),
    spinning: state.location.loading,
    siteName: state.location.brandAltText,
    currentPath: state.router.location.pathname.slice(1),
  };
}

export default connect(mapStateToProps, { fetchMetaData, fetchLocationData })(
  App
);
