import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../features/jobs/jobsSlice";

import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./MultipleSelect.css";
import VerticalLine from "../VerticalLine";
import SelectedOptions from "./SelectOptions";

export default function MultipleSelectChip({ name, label, multiple }) {
  const dispatch = useDispatch();
  const boxRef = React.useRef(null);
  const menuBoxRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const filters = useSelector((state) => state.jobs.filters);
  const selectedOptions = filters[name];

  const handleClearFilter = () => {
    dispatch(
      updateFilters({
        [name]: typeof selectedOptions === "string" ? "" : [],
      })
    );
  };

  const handleMultiSelectChange = (value) => {
    if (!filters[name].includes(value)) {
      dispatch(
        updateFilters({
          [name]: multiple ? [...filters[name], value] : value,
        })
      );
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSingleClear = (value) => {
    dispatch(
      updateFilters({
        [name]: multiple
          ? selectedOptions.filter((option) => option !== value)
          : "",
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
      // const verticalLine = document.getElementById("verticalLine");
      if (selectInput) {
        if (!menuBoxRef.current) return;
        menuBoxRef.current.style.width = selectInput.offsetWidth + "px";
      }
      // TODO: Fix vertical line height
      // if (verticalLine) {
      //   verticalLine.style.height = selectInput.offsetHeight + "px";
      // }
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
        {label}
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
            {multiple ? (
              selectedOptions.map((value) => (
                <div key={value} className="chip">
                  <p>{value}</p>
                  <CloseIcon
                    onClick={() => handleSingleClear(value)}
                    fontSize="12px"
                    sx={{ marginLeft: "6px" }}
                  />
                </div>
              ))
            ) : (
              <div
                style={{ display: selectedOptions ? "" : "none" }}
                key={selectedOptions}
                className="chip"
              >
                <p>{selectedOptions}</p>
                <CloseIcon
                  onClick={() => handleSingleClear(selectedOptions)}
                  fontSize="12px"
                  sx={{ marginLeft: "6px" }}
                />
              </div>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <CloseIcon
              fontSize="16px"
              sx={{
                marginLeft: "8px",
                zIndex: 100,
                display: selectedOptions.length ? "" : "none",
              }}
              onClick={handleClearFilter}
            />
            <VerticalLine
              sx={{ display: selectedOptions.length ? "" : "none" }}
            />
            <KeyboardArrowDownIcon sx={{ color: open ? "gray" : "white" }} />
          </Box>
        </Box>
        <Box
          key={name}
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
            maxHeight: "240px",
            overflowY: "auto",
          }}
        >
          {SelectedOptions(name, handleMultiSelectChange)}
        </Box>
      </Box>
    </Box>
  );
}
