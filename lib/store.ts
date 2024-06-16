import { configureStore } from "@reduxjs/toolkit";
import counterProducer from "./features/counterSlice";
import campaignSlice from "./features/campaignSlice";
import userSlice from "./features/userSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      counterProducer,
      campaignSlice,
      userSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
