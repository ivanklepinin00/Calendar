import _cloneDeep from "lodash/cloneDeep";
import React from "react";
import { CalendarCell } from "./CalendarCell";
import { CalendarDay } from "components/Calendar/types";
import { changeEvent } from "store";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { MonthGridWrapper } from "./styled-components";
import { useDispatch } from "react-redux";

interface MonthGridProps {
  days: CalendarDay[];
  setDays: React.Dispatch<React.SetStateAction<CalendarDay[]>>;
}

export const MonthGrid: React.FC<MonthGridProps> = React.memo(
  ({ days, setDays }) => {
    const dispatch = useDispatch();

    const onDragEnd = (result: DropResult) => {
      const { source, destination } = result;

      if (!destination) return;

      const sourceDay = _cloneDeep(
        days.find((day) => day.id === source?.droppableId),
      );
      const destinationDay = _cloneDeep(
        days.find((day) => day.id === destination?.droppableId),
      );

      if (!sourceDay || !destinationDay) return;

      const moveEventToAnotherDay =
        source.droppableId !== destination.droppableId;

      const sourceEvents = sourceDay?.events!;
      const destEvents = destinationDay?.events!;
      const [removed] = sourceEvents.splice(source.index, 1);

      if (moveEventToAnotherDay) {
        destEvents.splice(destination.index, 0, removed);
        sourceDay.events = sourceEvents;
        destinationDay.events = destEvents;
        dispatch(changeEvent({ ...removed, startTime: destinationDay.value }));
      }

      if (!moveEventToAnotherDay) {
        sourceEvents.splice(destination.index, 0, removed);
      }

      const newDays = days.map((day) => {
        if (day.id === sourceDay.id) return sourceDay;
        if (day.id === destinationDay.id) return destinationDay;
        return day;
      });

      setDays(newDays);
    };

    return (
      <MonthGridWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          {days.map((day) => (
            <CalendarCell day={day} key={day.value} />
          ))}
        </DragDropContext>
      </MonthGridWrapper>
    );
  },
);
