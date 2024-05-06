import React from "react";
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
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
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

  const [MenuProps, setMenuProps] = React.useState({
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        minWidth: 180,
        border: "0px solid red",
      },
    },
  });

  const handleOpen = () => {
    if (window) {
      const selectInput = document.getElementById("select-input");
      if (selectInput) {
        console.log(
          selectInput.offsetWidth,
          selectInput.clientWidth,
          selectInput.style.width
        );
        setMenuProps({
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
              width: selectInput.offsetWidth,
              minWidth: 180,
            },
          },
        });
      }
    }
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

  return (
    <FormControl key={name} sx={{ m: 1, width: "fit-content" }}>
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
      <Select
        id="select-input"
        open={open}
        onOpen={handleOpen}
        onClose={() => setOpen(false)}
        multiple={multiple}
        name={name}
        value={selectedOptions}
        onChange={handleMultiSelectChange}
        input={
          <OutlinedInput
            color="secondary"
            sx={{
              padding: 0,
              minWidth: "180px",
              height: "fit-content",
              "& .MuiSelect-select": {
                padding: "8px 14px",
              },
            }}
          />
        }
        IconComponent={KeyboardArrowDownIcon}
        renderValue={(selected) => (
          <Box
            sx={{
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
              {selected.map((value) => (
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
            <CloseIcon
              fontSize="16px"
              sx={{ marginLeft: "0px", zIndex: 100 }}
              onClick={handleClearFilter}
            />
            <Line direction="vertical" sx={{ display: open ? "" : "hidden" }} />
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {optionsBasedOnName(name)}
      </Select>
    </FormControl>
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
          value={option}
          disabled={option.charAt(option.length - 1) === "*"}
          sx={
            option.charAt(option.length - 1) === "*"
              ? { fontSize: "13px", textTransform: "uppercase" }
              : {
                  fontSize: "14px",
                }
          }
        >
          {option}
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
