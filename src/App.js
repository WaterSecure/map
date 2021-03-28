import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import Map from "./features/map/Map";
import LocationList from "./features/locations/LocationList";
import "./App.css";
import UserNav from "./features/locations/UserNav";
import LocationModal, {
  LocationOpener,
} from "./features/locations/LocationModal";
import { Route } from "react-router-dom";
import MobileNav from "./features/locations/MobileNav";
import Spinner from "./features/locations/Spinner";
import { connect } from "react-redux";

function App(props) {
  // Set Title properly
  useEffect(() => {
    if (props.currentPath === "") document.title = props.siteName;
  });

  return (
    <>
      <Spinner />
      <Container fluid style={{ margin: 0, padding: 0, height: "100%" }}>
        <Row
          no-gutters="true"
          style={{ margin: 0, padding: 0, height: "100%" }}
        >
          <Col
            className="locations-sidebar"
            lg="3"
            style={{
              height: "100%",
              position: "absolute",
              margin: 0,
              padding: 0,
              left: 0,
              top: 0,
            }}
          >
            <UserNav />
            <LocationList />
          </Col>
          <Col
            className="locations-sidebar"
            lg="3"
            style={{ height: "100%" }}
          />

          <Col
            id="map"
            lg="9"
            style={{
              margin: 0,
              padding: 0,
              height: "100vh",
              position: "relative",
            }}
          >
            <MobileNav className={"mobile-navbar"} />
            {props.loading ? null : <Map />}
          </Col>
        </Row>
      </Container>
      <LocationModal />
      <Route path="/:locationName" render={() => <LocationOpener />} />
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

export default connect(mapStateToProps)(App);
