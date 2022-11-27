import styled from "styled-components";

export const CalendarGridWrapper = styled.div`
  width: 100%;
`;

export const MonthGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3rem;
  padding: 10px;
`;

export const CalendarHeaderWrapper = styled.div`
  width: 100%;

  h2 {
    text-align: center;
  }
`;

export const CalendarHeaderCells = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3rem;
  padding: 10px 10px 0;

  span {
    text-align: center;
  }
`;

interface CalendarCellWrapperProps {
  isCurrentMonth: boolean;
}

export const CalendarCellWrapper = styled.div<CalendarCellWrapperProps>`
  height: 150px;
  background-color: ${(props) =>
    props.isCurrentMonth ? "lightgrey" : "#ebebeb"};
  padding: 0.3rem;
`;

export const CalendarCellHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  position: relative;
  padding-bottom: 10px;

  span {
    font-weight: bold;
    margin-right: 5px;
  }

  button {
    position: absolute;
    padding: 0;
    right: 0;
  }
`;

export const CalendarCellBody = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 128px;
`;

export const CalendarEventWrapper = styled.div`
  width: 100%;
  padding: 7px;
  font-size: 16px;
  border-radius: 5px;
  background-color: white;
  margin: 5px 0;

  p {
    word-break: break-all;
  }
`;

export const CalendarEventLabelWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.3rem;
  padding-bottom: 5px;
`;

export const CalendarEventLabel = styled.span`
  display: block;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  height: 7px;
`;

export const HolidayComponentWrapper = styled.div`
  background-color: blue;
  color: white;
  padding: 5px;
  border-radius: 10px;
`;
