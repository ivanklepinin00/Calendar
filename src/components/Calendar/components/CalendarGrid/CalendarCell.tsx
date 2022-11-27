import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import React from "react";
import { CalendarDay } from "components/Calendar/types";
import { checkIsFirstOrLastDay } from "components/Calendar/helpers";
import { Droppable } from "react-beautiful-dnd";
import { EventComponent } from "./EventComponent";
import { HolidayComponent } from "./HolidayComponent";
import { IconButton } from "@mui/material";
import { RootState } from "store/configureStore";
import { selectHolidaysForDay, setEventModal } from "store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  CalendarCellBody,
  CalendarCellHeader,
  CalendarCellWrapper,
} from "./styled-components";

interface CalendarCellProps {
  day: CalendarDay;
}

export const CalendarCell: React.FC<CalendarCellProps> = React.memo(
  ({ day }) => {
    const dispatch = useDispatch();
    const holidays = useSelector(
      (state: RootState) => selectHolidaysForDay(state, day.value),
      shallowEqual,
    );

    const { value, isCurrentMonth, events } = day;
    const dateStr = checkIsFirstOrLastDay(value)
      ? moment(value).format("MMM D ")
      : moment(value).format("D");

    const addEventHandler = () => {
      dispatch(setEventModal({ isShown: true, event: null, day }));
    };
    return (
      <Droppable key={day.id} droppableId={day.id}>
        {(provided) => (
          <CalendarCellWrapper
            isCurrentMonth={isCurrentMonth}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <CalendarCellHeader>
              <span>{dateStr}</span>
              {!!events.length && <p>{`${events.length} card`}</p>}
              <IconButton size="small" onClick={addEventHandler}>
                <AddIcon />
              </IconButton>
            </CalendarCellHeader>

            <CalendarCellBody>
              <>
                {holidays.map((holiday) => (
                  <HolidayComponent holiday={holiday} />
                ))}
                {events.map((event, index) => (
                  <EventComponent event={event} index={index} key={event.id} />
                ))}
              </>
            </CalendarCellBody>

            {provided.placeholder}
          </CalendarCellWrapper>
        )}
      </Droppable>
    );
  },
);
