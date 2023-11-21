import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function CustomAutoComplete({
  value,
  onChange,
  optionlist,
  labels,
}) {
  const [selectedValue, setSelectedValue] = useState(value);
  const [options] = useState(optionlist);
  const handleValueChange = (event, newValue, reason) => {
    let updatedValue = {
      label: null,
      value: null,
    };
    if (reason !== "clear") {
      updatedValue = {
        label: newValue,
        value: newValue.label,
      };
    }
    onChange(updatedValue);
    setSelectedValue(newValue);
  };

  return (
    <Autocomplete
      id={labels}
      options={options}
      autoHighlight
      autoFocus
      className={labels.replace(/\d+$/, "")}
      style={{ marginTop: "8px" }}
      onChange={handleValueChange}
      value={selectedValue || null}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select from list"
          className={labels.replace(/\d+$/, "")}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
}
