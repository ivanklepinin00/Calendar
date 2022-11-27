import { CalendarEvent } from "components/Calendar/types";
import { Draggable } from "react-beautiful-dnd";
import { setEventModal } from "store";
import { useDispatch } from "react-redux";
import {
  CalendarEventLabel,
  CalendarEventLabelWrapper,
  CalendarEventWrapper,
} from "./styled-components";

interface EventComponentProps {
  event: CalendarEvent;
  index: number;
}

export const EventComponent: React.FC<EventComponentProps> = ({
  event,
  index,
}) => {
  const dispatch = useDispatch();
  const showLabels = !!event.labels?.length;

  const onEventClick = () => {
    dispatch(setEventModal({ isShown: true, event, day: null }));
  };

  return (
    <Draggable key={event.id} draggableId={event.id} index={index}>
      {(provided) => (
        <CalendarEventWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onEventClick}
        >
          {showLabels && (
            <CalendarEventLabelWrapper>
              {event.labels.map((label, i) => (
                <CalendarEventLabel color={label} key={`${label} ${i}`} />
              ))}
            </CalendarEventLabelWrapper>
          )}

          <p>{event.text}</p>
        </CalendarEventWrapper>
      )}
    </Draggable>
  );
};
