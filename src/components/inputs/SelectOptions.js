import React from "react";
import MenuItem from "@mui/material/MenuItem";

export default function SelectedOptions(
  name,
  handleMultiSelectChange,
  selectedOptions,
  incomingOptions,
) {
  switch (name) {
    case "roles": {
      let options = incomingOptions;

      if (typeof selectedOptions !== "string") {
        options = options.filter((option) => !selectedOptions.includes(option));
      }

      return options.map((option) => (
        <MenuItem
          key={option}
          onClick={() => handleMultiSelectChange(option)}
          value={
            option.charAt(option.length - 1) === "*"
              ? option.substring(0, option.length - 1)
              : option
          }
          disabled={option.charAt(option.length - 1) === "*"}
          sx={
            option.charAt(option.length - 1) === "*"
              ? { fontSize: "13px", textTransform: "uppercase" }
              : {
                  fontSize: "14px",
                }
          }
        >
          {option.charAt(option.length - 1) === "*"
            ? option.substring(0, option.length - 1)
            : option}
        </MenuItem>
      ));
    }
    case "noOfEmployees": {
      let options = incomingOptions;
      if (typeof selectedOptions !== "string") {
        options = options.filter((option) => !selectedOptions.includes(option));
      } else {
        options = options.filter((option) => option !== selectedOptions);
      }
      return options.map((option) => (
        <MenuItem
          key={option}
          value={option}
          onClick={() => handleMultiSelectChange(option)}
          sx={{
            fontSize: "14px",
            ":hover": {
              bgcolor: "#234567",
            },
          }}
        >
          {option}
        </MenuItem>
      ));
    }
    case "minExperience": {
      let options = incomingOptions;
      if (typeof selectedOptions !== "string") {
        options = options.filter((option) => !selectedOptions.includes(option));
      } else {
        options = options.filter((option) => option !== selectedOptions);
      }
      return options.map((option) => (
        <MenuItem
          key={option}
          value={option}
          onClick={() => handleMultiSelectChange(option)}
          sx={{ fontSize: "14px" }}
        >
          {option}
        </MenuItem>
      ));
    }
    case "locationType": {
      let options = incomingOptions;
      if (typeof selectedOptions !== "string") {
        options = options.filter((option) => !selectedOptions.includes(option));
      } else {
        options = options.filter((option) => option !== selectedOptions);
      }
      return options.map((option) => (
        <MenuItem
          key={option}
          value={option}
          onClick={() => handleMultiSelectChange(option)}
          sx={{ fontSize: "14px" }}
        >
          {option}
        </MenuItem>
      ));
    }
    case "minBasePay": {
      let options = incomingOptions;
      if (typeof selectedOptions !== "string") {
        options = options.filter((option) => !selectedOptions.includes(option));
      } else {
        options = options.filter((option) => option !== selectedOptions);
      }
      return options.map((option) => (
        <MenuItem
          key={option}
          value={option}
          onClick={() => handleMultiSelectChange(option)}
          sx={{ fontSize: "14px" }}
        >
          {option}
        </MenuItem>
      ));
    }
    default:
      return [];
  }
}
