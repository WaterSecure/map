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
            <button aria-haspopup="true">
              <svg viewBox="0 0 90 75" width="40" height="40">
                <rect width="90" height="12" rx="8"></rect>
                <rect y="25" width="90" height="12" rx="8"></rect>
                <rect y="50" width="90" height="12" rx="8"></rect>
              </svg>
            </button>
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
