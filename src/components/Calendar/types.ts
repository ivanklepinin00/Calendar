export enum View {
  MONTH = "month",
}

export interface CalendarDay {
  id: string;
  value: string;
  active: boolean;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

export interface CalendarEvent {
  id: string;
  startTime: string;
  text: string;
  labels: string[];
}
