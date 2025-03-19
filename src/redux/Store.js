import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slices/usersSlice";
import tripsReducer from "./Slices/tripsSlice";
import dealsReducer from "./Slices/dealsSlice";
import shipmentsReducer from "./Slices/shipmentSlice";
import authReducer from "./Slices/authSlice";
export const store = configureStore({
  reducer: {
    users : usersReducer,
    trips: tripsReducer,
    deals: dealsReducer,
    shipments: shipmentsReducer,
    auth: authReducer
  },
});
