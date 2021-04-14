import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { urlify_location } from "../../utils";
import React, { useEffect } from "react";
import { connect } from "react-redux";

function getMeta(metaName) {
  const metas = document.getElementsByTagName("meta");

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("name") === metaName) {
      return metas[i];
    }
  }

  return "";
}

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: [],
    categories: [],
    loading: true,
    error: null,
    filters: {
      max_distance: 0,
      contains_text: "",
      categories: [],
    },
    current_user_location: null,
    modalIsOpen: false,
    brandLogo: null,
    brandAltText: null,
    activeLocation: null,
    features: {
      site_name_in_location: true,
      show_distance: false,
    },
  },
  reducers: {
    fetchDataBegin: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      let features = action.payload.metadata.features || {};

      state.locations = action.payload.locations;
      state.categories = action.payload.categories;

      state.brandLogo = action.payload.metadata.brand_logo;
      state.brandAltText = action.payload.metadata.brand_alt;
      state.loading = false;
      // features
      state.features.site_name_in_location =
        features.site_name_in_location || state.features.site_name_in_location;
      state.features.show_distance =
        features.show_distance || state.features.show_distance;

      document.title = action.payload.metadata.brand_alt;

      getMeta("description").content = action.payload.metadata.description;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload.error;
    },
    setMaxDistanceFilter: (state, action) => {
      state.filters.max_distance = action.payload;
    },
    setTextFilter: (state, action) => {
      state.filters.contains_text = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.categories = action.payload;
    },
    setActiveLocation: (state, action) => {
      if (!!action.payload) {
        document.title = action.payload.title;
      } else {
        document.title = "WaterSecure";
      }
      state.activeLocation = action.payload;
    },
  },
});

export const {
  fetchDataBegin,
  fetchDataSuccess,
  fetchDataFailure,
  setTextFilter,
  setCategoryFilter,
  setActiveLocation,
  closeModal,
} = locationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const logoAltTextSelector = (state) => state.location.brandAltText;
export const filterOpenSelector = (state) => state.location.filterIsOpen;
export const allLocationsSelector = (state) => state.location.locations;
export const allCategoriesSelector = (state) => state.location.categories;
export const locationModalIsOpenSelector = (state) =>
  state.location.modalIsOpen;
export const activeLocationSelector = (state) => state.location.activeLocation;

export const urlToLocationMapSelector = createSelector(
  allLocationsSelector,
  (locations) => {
    let url_map = {};
    for (let location of locations) {
      console.log(location);
      // let new_location = Object.create(location);
      url_map[urlify_location(location.title)] = location;
    }
    return url_map;
  }
);

export function fetchLocationData() {
  return async (dispatch) => {
    dispatch(fetchDataBegin());
    try {
      const [locations, metadata, categories] = await Promise.all([
        fetch(`./data/locations.json`).then((res) => res.json()),
        fetch(`./data/project.json`).then((res) => res.json()),
        fetch(`./data/categories.json`).then((res) => res.json()),
      ]);
      console.log(locations);
      dispatch(
        fetchDataSuccess({
          locations: locations.locations,
          metadata: metadata.metadata,
          categories: categories.categories,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(fetchDataFailure(error));
    }
  };
}

let LocationOpener = (props) => {
  useEffect(() => {
    // Update the document title using the browser API
    if (props.isRoot) {
      props.setActiveLocation(null);
      // Update the document title using the browser API
    } else if (!props.location) {
      props.setActiveLocation(props.urlLocation);
      // Update the document title using the browser API
    }
  });
  return <></>;
};

LocationOpener = connect(
  (state) => {
    const path = state.router.location.pathname.slice(1);
    let urlLocation = urlToLocationMapSelector(state)[path];
    return {
      location: activeLocationSelector(state),
      urlLocation: urlLocation,
      isRoot: path === "",
      siteName: state.location.brandAltText,
      site_name_in_location: state.location.features.site_name_in_location,
    };
  },
  {
    setActiveLocation,
  }
)(LocationOpener);

export { LocationOpener };

export default locationSlice.reducer;
