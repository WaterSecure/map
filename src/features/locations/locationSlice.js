import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { distance_in_km, urlify_location } from "../../utils";
import _ from "lodash";

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
    initial_map_center: [-113.496548, 53.511435],
    initial_map_zoom: [11.25],
    initial_map_pitch: [50],
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

      state.initial_map_center =
        action.payload.metadata.initial_map_center.coordinates;
      state.initial_map_zoom = [action.payload.metadata.initial_map_zoom];
      state.initial_map_pitch = [action.payload.metadata.initial_map_pitch];
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
      state.activeLocation = action.payload;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
      state.activeLocation = null;
    },
    openModal: (state) => {
      state.modalIsOpen = true;
    },
  },
});

export const {
  fetchDataBegin,
  fetchDataSuccess,
  fetchDataFailure,
  setMaxDistanceFilter,
  setTextFilter,
  setCategoryFilter,
  setActiveLocation,
  closeModal,
  openModal,
} = locationSlice.actions;

function text_in(location, text) {
  return (
    location.title.toLowerCase().includes(text.toLowerCase()) ||
    location.description.toLowerCase().includes(text.toLowerCase())
  );
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const logoSelector = (state) => state.location.brandLogo;
export const logoAltTextSelector = (state) => state.location.brandAltText;
export const filterOpenSelector = (state) => state.location.filterIsOpen;
export const allFilterSelector = (state) => state.location.filters;
export const allLocationsSelector = (state) => state.location.locations;
export const allCategoriesSelector = (state) => state.location.categories;
export const locationModalIsOpenSelector = (state) =>
  state.location.modalIsOpen;
export const activeLocationSelector = (state) => state.location.activeLocation;
export const userLocationSelector = (state) =>
  state.location.current_user_location || state.location.initial_map_center;
export const allLocationsWithDistanceSelector = createSelector(
  allLocationsSelector,
  userLocationSelector,
  (locations, user_location) => {
    let new_locations = [];
    for (let location of locations) {
      let new_location = Object.create(location);
      new_location.distance = distance_in_km(
        new_location.geo.geometry.coordinates,
        user_location
      );
      new_locations.push(new_location);
    }
    new_locations.sort((a, b) => a.distance - b.distance);
    return new_locations;
  }
);

export const filterFunctionSelector = createSelector(
  allFilterSelector,
  (filters) => {
    return (location) => {
      if (filters.max_distance && location.distance > filters.max_distance) {
        return false;
      }
      if (filters.contains_text && !text_in(location, filters.contains_text)) {
        return false;
      }
      if (
        filters.categories.length !== 0 &&
        !filters.categories.includes(location.category_id)
      ) {
        return false;
      }
      return true;
    };
  }
);

export const filteredLocationsSelector = createSelector(
  allLocationsWithDistanceSelector,
  filterFunctionSelector,
  (locations, filter) => locations.filter(filter)
);

export const urlToLocationMapSelector = createSelector(
  allLocationsWithDistanceSelector,
  (locations) => {
    let url_map = {};
    for (let location of locations) {
      // let new_location = Object.create(location);
      url_map[urlify_location(location.title)] = location;
    }
    return url_map;
  }
);

export const filteredLocationsAsGeoJSONSelector = createSelector(
  filteredLocationsSelector,
  (locations) => {
    return {
      type: "FeatureCollection",
      // features: locations.map(location => location.geo)
      features: locations.map((location) => {
        let location_geo = _.cloneDeep(location.geo);
        location_geo.properties = {
          id: location.id,
          title: location.title,
          category_id: location.category_id,
        };
        return location_geo;
      }),
    };
  }
);

export function fetchData() {
  return async (dispatch) => {
    dispatch(fetchDataBegin());
    try {
      const [locations, metadata, categories] = await Promise.all([
        fetch(`./data/locations.json`).then((res) => res.json()),
        fetch(`./data/project.json`).then((res) => res.json()),
        fetch(`./data/categories.json`).then((res) => res.json()),
      ]);
      dispatch(
        fetchDataSuccess({
          locations: locations.locations,
          metadata: metadata.metadata,
          categories: categories.categories,
        })
      );
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
}

export default locationSlice.reducer;
