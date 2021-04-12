import { createSlice } from "@reduxjs/toolkit";

function getMeta(metaName) {
  const metas = document.getElementsByTagName("meta");

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("name") === metaName) {
      return metas[i];
    }
  }

  return "";
}
export const metaSlice = createSlice({
  name: "metadata",
  initialState: {
    loading: true,
    error: null,
    brandLogo: null,
    brandAltText: null,
    title: null,
    favicon: null,
    menuItems: [],
    description: null,
    initial_map_center: [-113.496548, 53.511435],
    initial_map_zoom: [11.25],
    initial_map_pitch: [50],
  },
  reducers: {
    fetchDataBegin: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.brandLogo = action.payload.metadata.brand_logo;
      state.brandAltText = action.payload.metadata.brand_alt;
      state.title = action.payload.metadata.title;
      state.favicon = action.payload.metadata.favicon;
      state.menuItems = action.payload.metadata.menuItems;
      state.description = action.payload.metadata.description;
      document.title = action.payload.metadata.title;

      state.initial_map_center =
        action.payload.map_metadata.initial_map_center.coordinates;
      state.initial_map_zoom = [action.payload.map_metadata.initial_map_zoom];
      state.initial_map_pitch = [action.payload.map_metadata.initial_map_pitch];

      getMeta("description").content = action.payload.metadata.description;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload.error;
    },
  },
});
export const logoSelector = (state) => state.metadata.brandLogo;
export const logoAltTextSelector = (state) => state.metadata.brandAltText;
export const menuItemsSelector = (state) => state.metadata.menuItems || [];

export const {
  fetchDataBegin,
  fetchDataSuccess,
  fetchDataFailure,
} = metaSlice.actions;

export function fetchMetaData() {
  return async (dispatch) => {
    dispatch(fetchDataBegin());
    try {
      const project = await fetch(`./data/project.json`).then((res) =>
        res.json()
      );
      let map_metadata = project.metadata["map"];
      map_metadata.initial_map_center = {
        initial_map_center: {
          type: "Point",
          coordinates: map_metadata.initial_map_center,
        },
      };
      dispatch(
        fetchDataSuccess({
          metadata: project.metadata.app,
          map_metadata: map_metadata,
        })
      );
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
}

export default metaSlice.reducer;
