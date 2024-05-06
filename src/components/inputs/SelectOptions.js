import React from "react";
import MenuItem from "@mui/material/MenuItem";

export default function SelectedOptions(name, handleMultiSelectChange) {
  switch (name) {
    case "roles": {
      const options = [
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
      const options = ["0-10", "11-50", "51-200", "201-500", "501-1000"];
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
      const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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
      const options = ["Remote", "Onsite"];
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
      const options = [
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
