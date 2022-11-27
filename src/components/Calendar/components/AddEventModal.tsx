import React, { ChangeEvent, useEffect, useState } from "react";
import { AVAILABLE_LABELS } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  changeEvent,
  closeEventModal,
  selectEventModal,
} from "store";
import {
  CheckboxGroupContainer,
  StyledDialogActions,
  StyledTypography,
} from "./styled-components";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Modal,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddEventModal: React.FC = () => {
  const dispatch = useDispatch();
  const { event, isShown, day } = useSelector(selectEventModal);

  const [labels, setLabels] = useState<string[]>([]);
  const [text, setText] = useState("");

  const isEditEvent = !!event;
  const modalTitle = isEditEvent ? "Edit event" : "Add event";

  const onClose = () => {
    dispatch(closeEventModal());
    setLabels([]);
    setText("");
  };

  const onLableCheck = (label: string) => {
    if (labels.includes(label)) {
      setLabels(labels.filter((item) => item !== label));
      return;
    }
    setLabels([...labels, label]);
  };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSave = () => {
    const newEvent = {
      startTime: isEditEvent ? event.startTime : day?.value!,
      text: text,
      labels: labels,
      id: event?.id || "",
    };

    dispatch(isEditEvent ? changeEvent(newEvent) : addEvent(newEvent));
    onClose();
  };

  useEffect(() => {
    if (isEditEvent) {
      setLabels(event.labels);
      setText(event.text);
    }
  }, [event, isEditEvent]);

  return (
    <div>
      <Modal open={isShown} onClose={onClose}>
        <Box sx={style}>
          <StyledTypography id="modal-modal-title" variant="h6">
            {modalTitle}
          </StyledTypography>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Labels
            </FormLabel>
            <CheckboxGroupContainer>
              {AVAILABLE_LABELS.map((label) => (
                <Checkbox
                  checked={labels.includes(label)}
                  key={label}
                  onChange={() => onLableCheck(label)}
                  sx={{
                    color: label,
                    "&.Mui-checked": {
                      color: label,
                    },
                  }}
                />
              ))}
            </CheckboxGroupContainer>

            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              value={text}
              onChange={onTextChange}
              rows={5}
            />
          </FormControl>

          <StyledDialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onSave} disabled={!text}>
              Save
            </Button>
          </StyledDialogActions>
        </Box>
      </Modal>
    </div>
  );
};
