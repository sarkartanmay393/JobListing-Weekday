import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters, clearFilters } from "../../features/jobs/jobsSlice";

import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./MultipleSelect.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function MultipleSelectChip({ name, options, multiple }) {
  const dispatch = useDispatch();
  const boxRef = React.useRef(null);
  const menuBoxRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const filters = useSelector((state) => state.jobs.filters);
  const selectedOptions = filters[name.toLowerCase()];

  const handleClearFilter = () => {
    dispatch(
      updateFilters({
        [name.toLowerCase()]: typeof selectedOptions === "string" ? "" : [],
      })
    );
  };

  const handleMultiSelectChange = (e) => {
    dispatch(
      updateFilters({
        [name.toLowerCase()]:
          typeof value === "string"
            ? e.target.value.split(",")
            : e.target.value,
      })
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSingleClear = (value) => {
    dispatch(
      updateFilters({
        [name.toLowerCase()]: selectedOptions.filter(
          (option) => option !== value
        ),
      })
    );
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (!boxRef.current) return;
      if (boxRef.current.contains(event.target)) {
        !open && handleOpen();
      } else {
        open && setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (window && document) {
      const selectInput = document.getElementById("select-input");
      if (selectInput) {
        if (!menuBoxRef.current) return;
        menuBoxRef.current.style.width = selectInput.offsetWidth + "px";
      }
    }
  }, [open, selectedOptions.length]);

  return (
    <Box
      ref={boxRef}
      key={name}
      sx={{ m: 1, width: "fit-content", position: "relative" }}
    >
      <label
        htmlFor={name}
        style={{
          position: "absolute",
          top: "8px",
          left: "12px",
          fontSize: "14px",
          ...(selectedOptions.length ? { top: "-26px", left: "4px" } : {}),
        }}
      >
        {name}
      </label>
      <Box
        name={name}
        id="select-input"
        sx={{
          display: "flex",
          gap: 0.5,
          alignItems: "center",
          borderRadius: "4px",
          padding: "6px",
          cursor: "pointer",
          border: "1px solid #c4c4c4",
          "&:hover": {
            border: "1.5px solid",
            borderColor: "primary.main",
          },
        }}
      >
        <Box
          sx={{
            minWidth: "180px",
            gap: 0.5,
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "space-between",
            border: "0px solid red",
            height: "fit-content",
          }}
        >
          <Box className="flex" sx={{ flexWrap: "wrap", gap: 0.5 }}>
            {selectedOptions.map((value) => (
              <div key={value} className="chip">
                <p>{value}</p>
                <CloseIcon
                  onClick={() => handleSingleClear(value)}
                  fontSize="12px"
                  sx={{ marginLeft: "6px" }}
                />
              </div>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <CloseIcon
              fontSize="16px"
              sx={{ marginLeft: "8px", zIndex: 100 }}
              onClick={handleClearFilter}
            />
            <Line direction="vertical" sx={{ display: open ? "" : "hidden" }} />
            <KeyboardArrowDownIcon sx={{ color: open ? "gray" : "white" }} />
          </Box>
        </Box>
        <Box
          ref={menuBoxRef}
          sx={{
            border: "1px solid #c4c4c4",
            borderRadius: "4px",
            minWidth: "180px",
            display: open ? "flex" : "none",
            flexDirection: "column",
            position: "absolute",
            bgcolor: "lightgray",
            top: "110%",
            left: 0,
            zIndex: 101,
          }}
        >
          {optionsBasedOnName(name)}
        </Box>
      </Box>
    </Box>
  );
}

function optionsBasedOnName(name) {
  switch (name) {
    case "Roles": {
      const options = [
        "Engineering*",
        "Frontend",
        "Backend",
        "Fullstack",
        "DevOps",
        "Data Scientist",
        "QA",
      ];

      return options.map((option) => (
        <MenuItem
          key={option}
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
    case "No of Employees": {
      const options = ["0-10", "11-50", "51-200", "201-500", "501-1000"];
      return options.map((option) => (
        <MenuItem key={option} value={option} sx={{ fontSize: "14px" }}>
          {option}
        </MenuItem>
      ));
    }
    default:
      return [];
  }
}

const Line = ({ direction, sx }) => {
  const lineStyle = {
    width: direction === "vertical" ? "1px" : "100%",
    height: direction === "vertical" ? "100%" : "1px",
    backgroundColor: "grey",
    // flexGrow: 1,
    minHeight: "18px",
    // ...(sx || {}),
  };

  return <div style={lineStyle}></div>;
};
