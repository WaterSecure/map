import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";
import { logoAltTextSelector, logoSelector } from "./locationSlice";

class UserNav extends React.Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img src={this.props.logoUrl} alt={this.props.altText} />
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    logoUrl: logoSelector(state),
    altText: logoAltTextSelector(state),
  };
}

export default connect(mapStateToProps)(UserNav);
