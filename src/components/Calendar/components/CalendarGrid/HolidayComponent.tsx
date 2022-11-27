import React from "react";
import { HolidayComponentContainer } from "./styled-components";
import { PublicHoliday } from "api/Nager/types";

interface HolidayComponentProps {
  holiday: PublicHoliday;
}
export const HolidayComponent: React.FC<HolidayComponentProps> = ({
  holiday,
}) => {
  return (
    <HolidayComponentContainer>{holiday.localName}</HolidayComponentContainer>
  );
};
