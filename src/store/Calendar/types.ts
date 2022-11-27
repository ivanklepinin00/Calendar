import { PublicHoliday } from "api/Nager/types";
import { CalendarDay, CalendarEvent } from "components/Calendar/types";

export interface EventModal {
  isShown: boolean;
  day: CalendarDay | null;
  event: CalendarEvent | null;
}

export interface CalendarFilters {
  labels: string[];
  text: string;
}

export interface HolidaysState {
  data: PublicHoliday[] | null;
  isLoading: boolean;
  error: string;
}
