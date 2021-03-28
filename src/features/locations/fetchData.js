import {
  fetchDataBegin,
  fetchDataFailure,
  fetchDataSuccess,
} from "./locationSlice";

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
