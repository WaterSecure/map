import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import filter from "../../images/filter.svg";
import { connect } from "react-redux";
import FilterCard from "./FilterCard";
import {
  filterOpenSelector,
  logoAltTextSelector,
  logoSelector,
} from "./locationSlice";

class MobileNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <div className={"mobile-nav"}>
        <Navbar color="light" light expand="xs">
          <NavbarBrand href="/">
            <img src={this.props.logoUrl} alt={this.props.altText} />
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink id="mobile-toggler" href="#">
                  <img src={filter} alt="filter" />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <FilterCard toggleSelector="mobile-toggler" />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    logoUrl: logoSelector(state),
    altText: logoAltTextSelector(state),
    isOpen: filterOpenSelector(state),
  };
}

export default connect(mapStateToProps)(MobileNav);
