import moment from "moment";
import React, { ChangeEvent, useState } from "react";
import { availableLabels } from "components/Calendar/constant";
import { selectCalendar, setEvents, setFilters } from "store";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  CalendarFiltersWrapper,
  FileProcessWrapper,
  FiltersWrapper,
  NavigationWrapper,
} from "./styled-components";

interface CalendarFiltersProps {
  currentDate: moment.Moment;
  setCurrentDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  onImageDownload: () => void;
}

export const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  currentDate,
  setCurrentDate,
  onImageDownload,
}) => {
  const dispatch = useDispatch();
  const { events } = useSelector(selectCalendar);

  const [labels, setLabels] = useState<string[]>([]);
  const [text, setText] = useState("");

  const onLableCheck = (event: SelectChangeEvent<string[]>) => {
    const labels = event.target?.value as string[];

    setLabels(labels);
  };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const prevMonthHandler = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  const currentMonthHandler = () => {
    setCurrentDate(moment());
  };

  const nextMonthHandler = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  const onFiltersApply = () => {
    dispatch(setFilters({ labels, text }));
  };

  const onFiltersClear = () => {
    dispatch(setFilters({ labels: [], text: "" }));
    setLabels([]);
    setText("");
  };

  const jsonFileDownload = () => {
    const json_data = {
      events,
    };
    const fileName = "calendar data.json";
    const data = new Blob([JSON.stringify(json_data)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");

    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  };

  const jsonFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      if (!e?.target?.result) return;
      const data = JSON.parse(e.target.result as string);

      if (data.events) {
        dispatch(setEvents(data.events));
      }
    };
  };

  const onFileUpload = () => {
    document.getElementById("calendar_data")?.click();
  };

  return (
    <CalendarFiltersWrapper>
      <FileProcessWrapper>
        <button onClick={onImageDownload}>Download As Image</button>
        <button onClick={jsonFileDownload}>Download JSON File</button>

        <button onClick={onFileUpload}>Upload Calendar</button>
        <input
          type="file"
          id="calendar_data"
          onChange={jsonFileUpload}
          accept=".json"
        />
      </FileProcessWrapper>

      <NavigationWrapper>
        <Button variant="outlined" onClick={prevMonthHandler}>
          Prev
        </Button>
        <Button variant="outlined" onClick={currentMonthHandler}>
          Current Month
        </Button>
        <Button variant="outlined" onClick={nextMonthHandler}>
          Next
        </Button>
      </NavigationWrapper>

      <FiltersWrapper>
        <FormControl sx={{ s: 4, width: 100 }} size="small">
          <InputLabel id="demo-multiple-checkbox-label">Labels</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={labels}
            onChange={(label) => onLableCheck(label)}
            input={<OutlinedInput label="Labels" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {availableLabels.map((label) => (
              <MenuItem key={label} value={label}>
                <Checkbox
                  checked={labels.includes(label)}
                  key={label}
                  sx={{
                    color: label,
                    "&.Mui-checked": {
                      color: label,
                    },
                  }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Text"
          size="small"
          variant="outlined"
          value={text}
          onChange={onTextChange}
        />
        <Button variant="outlined" onClick={onFiltersApply}>
          Apply
        </Button>
        <Button variant="outlined" onClick={onFiltersClear}>
          Clear
        </Button>
      </FiltersWrapper>
    </CalendarFiltersWrapper>
  );
};
