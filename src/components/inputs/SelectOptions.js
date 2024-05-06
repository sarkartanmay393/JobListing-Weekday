import React from "react";
import MenuItem from "@mui/material/MenuItem";

export default function SelectedOptions(
  name,
  handleMultiSelectChange,
  selectedOptions
) {
  switch (name) {
    case "roles": {
      let options = [
        "Engineering*",
        "Frontend",
        "Backend",
        "Fullstack",
        "Android",
        "IOS",
        "DevOps",
        "Data Scientist",
        "QA",
      ];

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
      let options = ["0-10", "11-50", "51-200", "201-500", "501-1000"];
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
      let options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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
      let options = ["Remote", "Onsite"];
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
      let options = [
        "0L",
        "10L",
        "20L",
        "30L",
        "40L",
        "50L",
        "60L",
        "70L",
        "80L",
        "90L",
        "100L",
      ];
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
