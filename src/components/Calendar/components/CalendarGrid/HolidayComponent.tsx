import React from "react";
import { HolidayComponentWrapper } from "./styled-components";
import { PublicHoliday } from "api/Nager/types";

interface HolidayComponentProps {
  holiday: PublicHoliday;
}
export const HolidayComponent: React.FC<HolidayComponentProps> = ({
  holiday,
}) => {
  return <HolidayComponentWrapper>{holiday.localName}</HolidayComponentWrapper>;
};
