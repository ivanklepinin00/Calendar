import html2canvas from "html2canvas";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { AddEventModal } from "./components/AddEventModal";
import { AppDispatch } from "store/configureStore";
import { Backdrop, CircularProgress } from "@mui/material";
import { CalendarFilters, CalendarGrid } from "./components";
import { fetchWorldwideHolidays, selectCalendar } from "store";
import { filterEvents } from "./helpers";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { View } from "./types";

export const Calendar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    events,
    filters,
    holidays: { isLoading },
  } = useSelector(selectCalendar, shallowEqual);

  const [currentDate, setCurrentDate] = useState(moment());
  const [view] = useState<View>(View.MONTH);
  const printRef = useRef<HTMLDivElement>(null);
  const currentYear = String(currentDate.year());

  const downloadImageHandler = async () => {
    const element = printRef.current;
    if (!element) return;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "calendar.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  useEffect(() => {
    dispatch(fetchWorldwideHolidays(currentYear));
  }, [dispatch, currentYear]);

  return (
    <>
      <CalendarFilters
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        onImageDownload={downloadImageHandler}
      />
      <div ref={printRef}>
        <CalendarGrid
          view={view}
          currentDate={currentDate}
          events={filterEvents(events, filters)}
        />
      </div>

      <AddEventModal />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
