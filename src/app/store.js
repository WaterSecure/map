import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import locationReducer from "../features/locations/locationSlice";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export let history = createBrowserHistory({
  /* pass a configuration object here if needed */
});

export default configureStore({
  reducer: {
    location: locationReducer,
    router: connectRouter(history),
  },
  middleware: [
    ...getDefaultMiddleware(),
    routerMiddleware(history), // for dispatching history actions
  ],
});
