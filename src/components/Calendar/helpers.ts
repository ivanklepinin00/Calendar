import moment from "moment";
import { CalendarFilters } from "store/Calendar/types";
import { CalendarDay, CalendarEvent } from "./types";

export const checkIsFirstOrLastDay = (date: string) => {
  const momentDate = moment(date);
  const startOfMonth = momentDate.clone().startOf("month");
  const endOfMonth = momentDate.clone().endOf("month");

  return (
    momentDate.isSame(startOfMonth, "date") ||
    momentDate.isSame(endOfMonth, "date")
  );
};

export const getEventsForCurrentDay = (
  date: moment.Moment,
  events: CalendarEvent[],
) => events.filter((event) => moment(event.startTime).isSame(date, "day"));

export const getDaysForCurrentMonth = (
  currentDate: moment.Moment,
  events: CalendarEvent[],
) => {
  const startDay = currentDate.clone().startOf("month").startOf("week");
  const endDay = currentDate.clone().endOf("month").endOf("week");

  const date = startDay.clone().subtract(1, "day");

  const days: CalendarDay[] = [];

  let id = 0;

  while (date.isBefore(endDay, "day")) {
    const value = date.add(1, "day").clone();
    const active = moment().isSame(value, "date");
    const isCurrentMonth = value.month() === moment().month();

    days.push({
      id: String(id),
      value: value.format(),
      active,
      isCurrentMonth,
      events: getEventsForCurrentDay(value, events),
    });

    id++;
  }
  return days;
};

export const changeEventTimeByDay = (
  event: CalendarEvent,
  day: CalendarDay,
): CalendarEvent => ({
  ...event,
  startTime: moment(event.startTime)
    .set({ month: moment(day.value).month(), date: moment(day.value).date() })
    .format(),
});

export const filterEvents = (
  events: CalendarEvent[],
  { labels, text }: CalendarFilters,
): CalendarEvent[] => {
  const filterByLabels = (event: CalendarEvent) =>
    labels.every((filter) => event.labels.includes(filter));

  const filterByText = (event: CalendarEvent) => event.text.includes(text);

  return events.filter(filterByLabels).filter(filterByText);
};
