import React, { useState, useEffect } from "react";

import Map from "./features/map/Map";
import LocationList from "./features/locations/LocationList";
import "./App.css";
import UserNav from "./features/Meta/NavBar";
import LocationModal, {
  LocationOpener,
} from "./features/locations/LocationModal";
import { Route } from "react-router-dom";
import Spinner from "./features/locations/Spinner";
import { connect } from "react-redux";
import { fetchMetaData } from "./features/Meta/metaSlice";
import WelcomeSidebar from "./features/Meta/WelcomeSidebar";

function App(props) {
  // Set Title properly
  let { fetchMetaData } = props;

  useEffect(() => {
    if (props.currentPath === "") document.title = props.siteName;
  });

  useEffect(() => {
    fetchMetaData();
  }, [fetchMetaData]);

  return (
    <>
      <nav role="navigation" className="navbar">
        <UserNav />
      </nav>
      <div className="sidebar">
        <WelcomeSidebar />
      </div>
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
      {/*<LocationModal />*/}
      {/*<Route path="/:locationName" render={() => <LocationOpener />} />*/}
    </>
  );
}

function mapStateToProps(state) {
  return {
    spinning: state.location.loading,
    siteName: state.location.brandAltText,
    currentPath: state.router.location.pathname.slice(1),
  };
}

export default connect(mapStateToProps, { fetchMetaData })(App);
