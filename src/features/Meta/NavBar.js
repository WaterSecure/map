import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchMetaData,
  logoAltTextSelector,
  logoSelector,
  menuItemsSelector,
} from "./metaSlice";
import "./NavBar.css";

function NavItem(props) {
  return (
    <li className="nav-item">
      <a href={props.link}>{props.title}</a>
    </li>
  );
}

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

function useCurrentWidth() {
  // save current window width in the state object
  let [width, setWidth] = useState(getWidth());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width;
}

function NavBar(props) {
  let width = useCurrentWidth();
  let collapsedWidth = props.collapsedWidth || 992;
  let collapsed = width < collapsedWidth;

  let { menuItems } = props;

  const navItems = menuItems.map((item) => {
    return <NavItem key={item.title} {...item} />;
  });

  return (
    <>
      <div className="vertical-center nav-title">
        <img src={props.logoUrl} alt={props.altText} />
      </div>
      <ul className="nav-items">
        {collapsed ? (
          <li className="vertical-center">
            <a href="#" aria-haspopup="true">
              Menu
            </a>
            <ul className="dropdown" aria-label="sublabel">
              {navItems}
            </ul>
          </li>
        ) : (
          navItems.slice(0).reverse()
        )}
      </ul>
    </>
  );
}

function mapStateToProps(state) {
  return {
    logoUrl: logoSelector(state),
    altText: logoAltTextSelector(state),
    menuItems: menuItemsSelector(state),
  };
}

export default connect(mapStateToProps, { fetchMetaData })(NavBar);
