import React, { useState, useEffect } from "react";

import Map from "./features/map/Map";
import "./App.css";
import UserNav from "./features/Meta/NavBar";
import { Route } from "react-router-dom";
import Spinner from "./features/locations/Spinner";
import { connect } from "react-redux";
import { fetchMetaData } from "./features/Meta/metaSlice";
import WelcomeSidebar from "./features/Meta/WelcomeSidebar";
import {
  activeLocationSelector,
  fetchLocationData,
  LocationOpener,
} from "./features/locations/locationSlice";
import LocationSidebar from "./features/locations/LocationSidebar";

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
      {/*<Spinner />*/}
      {/*<Container fluid style={{ margin: 0, padding: 0, height: "100%" }}>*/}
      {/*  <Row*/}
      {/*    no-gutters="true"*/}
      {/*    style={{ margin: 0, padding: 0, height: "100%" }}*/}
      {/*  >*/}
      {/*    <Col*/}
      {/*      className="locations-sidebar"*/}
      {/*      lg="3"*/}
      {/*      style={{*/}
      {/*        height: "100%",*/}
      {/*        position: "absolute",*/}
      {/*        margin: 0,*/}
      {/*        padding: 0,*/}
      {/*        left: 0,*/}
      {/*        top: 0,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <UserNav />*/}
      {/*      <LocationList />*/}
      {/*    </Col>*/}
      {/*    <Col*/}
      {/*      className="locations-sidebar"*/}
      {/*      lg="3"*/}
      {/*      style={{ height: "100%" }}*/}
      {/*    />*/}
      {/*    <Col*/}
      {/*      id="map"*/}
      {/*      lg="9"*/}
      {/*      style={{*/}
      {/*        margin: 0,*/}
      {/*        padding: 0,*/}
      {/*        height: "100vh",*/}
      {/*        position: "relative",*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <MobileNav className={"mobile-navbar"} />*/}
      {/*      {props.loading ? null : <Map />}*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*</Container>*/}
      <Route
        path="/:locationName"
        render={() => (
          <style
            dangerouslySetInnerHTML={{
              __html: `div.location-sidebar { width: 100%; }`,
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
