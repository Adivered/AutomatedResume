import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";

function CustomDatePicker({
  value,
  onChange,
  views,
  htmlFor,
  placeholder,
  minDate,
  maxDate,
  closeOnChoose,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDayChoose = (newDate) => {
    onChange(newDate);

    if (closeOnChoose) {
      setIsOpen(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <InputLabel
        style={{
          textAlign: "left",
          color: "black",
        }}
        htmlFor={htmlFor}
      >
        {`${placeholder}:`}
      </InputLabel>
      <DatePicker
        style={{ width: "100%" }}
        value={value}
        onChange={handleDayChoose}
        slotProps={{
          textField: {
            id: htmlFor,
            style: {
              width: "100%",
              marginTop: "8px",
            },
            placeholder: placeholder,
          },
        }}
        required
        views={views}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        minDate={minDate ? dayjs(minDate) : dayjs("1900-01-01")}
        maxDate={maxDate ? dayjs(maxDate) : dayjs()}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
