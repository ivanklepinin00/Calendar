import moment from "moment";
import React from "react";
import { WEEK_DAYS_IDS } from "./constants";
import {
  CalendarHeaderContainer,
  CalendarHeaderCells,
} from "./styled-components";

const weekDayFormat = "ddd";

interface CalendarHeaderprops {
  currentDate: moment.Moment;
}

export const CalendarHeader: React.FC<CalendarHeaderprops> = ({
  currentDate,
}) => {
  return (
    <CalendarHeaderContainer>
      <h2>{currentDate.format("MMMM")}</h2>
      <CalendarHeaderCells>
        {WEEK_DAYS_IDS.map((day, i) => {
          return (
            <span key={i}>{moment().weekday(day).format(weekDayFormat)}</span>
          );
        })}
      </CalendarHeaderCells>
    </CalendarHeaderContainer>
  );
};
