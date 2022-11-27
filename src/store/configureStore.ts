import { AnyAction } from "redux";
import { CalendarReducer } from "store";
import { combineReducers } from "redux";
import { configureStore, ThunkDispatch } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  calendar: CalendarReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
export type GetState = { getState: () => RootState };
