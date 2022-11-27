import moment from "moment";
import React, { useEffect, useState } from "react";
import { CalendarEvent, View } from "components/Calendar/types";
import { CalendarGridContainer } from "./styled-components";
import { CalendarHeader, MonthGrid } from ".";
import { getDaysForCurrentMonth } from "components/Calendar/helpers";

interface CalendarGridProps {
  view: View;
  currentDate: moment.Moment;
  events: CalendarEvent[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = React.memo(
  ({ view, currentDate, events }) => {
    const [days, setDays] = useState(
      getDaysForCurrentMonth(currentDate, events),
    );

    useEffect(() => {
      setDays(getDaysForCurrentMonth(currentDate, events));
    }, [currentDate, events]);

    return (
      <CalendarGridContainer>
        <CalendarHeader currentDate={currentDate} />
        {view === View.MONTH && <MonthGrid days={days} setDays={setDays} />}
      </CalendarGridContainer>
    );
  },
);
