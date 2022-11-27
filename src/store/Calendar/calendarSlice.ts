import moment from "moment";
import { CalendarEvent } from "components/Calendar/types";
import { CalendarFilters, EventModal, HolidaysState } from "./types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NagerApi } from "api";
import { RootState } from "../configureStore";

interface InitialsState {
  events: CalendarEvent[];
  eventModal: EventModal;
  filters: CalendarFilters;
  holidays: HolidaysState;
}

const initialState: InitialsState = {
  events: [],
  eventModal: {
    isShown: false,
    day: null,
    event: null,
  },
  filters: {
    labels: [],
    text: "",
  },
  holidays: {
    data: null,
    isLoading: false,
    error: "",
  },
};

export const fetchWorldwideHolidays = createAsyncThunk(
  "calendar/fetchWorldwideHolidays",
  async (year: string) => {
    const response = await NagerApi.getHolidays(year);

    return response.data;
  },
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setEvents: (state, { payload }: PayloadAction<CalendarEvent[]>) => {
      state.events = payload;
    },
    changeEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      const newEvents = state.events.length
        ? state.events.map((event) =>
            event.id === payload.id ? payload : event,
          )
        : [payload];

      state.events = newEvents;
    },
    addEvent: (
      state,
      { payload }: PayloadAction<Omit<CalendarEvent, "id">>,
    ) => {
      const lastEvent = state.events[state.events.length - 1];
      const newEvent = {
        ...payload,
        id: lastEvent ? String(+lastEvent.id + 1) : "0",
      };
      state.events = [...state.events, newEvent];
    },
    setEventModal: (state, { payload }: PayloadAction<EventModal>) => {
      state.eventModal = payload;
    },
    closeEventModal: (state) => {
      state.eventModal = { ...initialState.eventModal };
    },
    setFilters: (state, { payload }: PayloadAction<CalendarFilters>) => {
      state.filters = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorldwideHolidays.fulfilled, (state, { payload }) => {
      state.holidays.data = payload;
      state.holidays.isLoading = false;
      state.holidays.error = "";
    });
    builder.addCase(fetchWorldwideHolidays.pending, (state) => {
      state.holidays.isLoading = true;
    });
    builder.addCase(fetchWorldwideHolidays.rejected, (state, action) => {
      state.holidays.error = action.error.message || "";
      state.holidays.isLoading = false;
    });
  },
});

export const {
  setEvents,
  changeEvent,
  setEventModal,
  closeEventModal,
  addEvent,
  setFilters,
} = calendarSlice.actions;
export const selectCalendar = ({ calendar }: RootState) => calendar;
export const selectEventModal = ({ calendar }: RootState) =>
  calendar.eventModal;
export const selectHolidaysForDay = ({ calendar }: RootState, date: string) => {
  const holidays = calendar.holidays.data;

  return holidays
    ? holidays.filter((holiday) =>
        moment(holiday.date).isSame(moment(date), "date"),
      )
    : [];
};

export const CalendarReducer = calendarSlice.reducer;
