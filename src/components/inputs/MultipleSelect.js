import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../store/slices/jobsSlice";

import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import VerticalLine from "../VerticalLine";
import SelectedOptions from "./SelectOptions";

import "./MultipleSelect.css";

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
    // document.getElementById(name + "-input").focus();
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
      const selectInput = document.getElementById(
        name.trim() + "-select-input"
      );
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
  }, [name, open, selectedOptions.length]);

  return (
    <Box
      className="filter-box"
      ref={boxRef}
      key={name}
      sx={{
        // width: "fit-content",
        position: "relative",
        border: "0px solid red",
        // flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <label
        id="filter-label-moving"
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
      </label> */}
      <label
        id="filter-label-mobile"
        htmlFor={name}
        style={{
          position: "absolute",
          top: "-26px",
          left: "4px",
          fontSize: "14px",
        }}
      >
        {label}
      </label>
      <Box
        name={name}
        id={name.trim() + "-select-input"}
        sx={{
          display: "flex",
          gap: 0.5,
          height: "max-content",
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
            flex: 1,
            minWidth: "180px",
            gap: 0.5,
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            border: "0px solid green",
          }}
        >
          <Box
            className="flex"
            sx={{
              // flex: 1,
              display: "flex",
              flexWrap: "wrap",
              overflow: "hidden",

              gap: 0.5,
              border: "0px solid red",
            }}
          >
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
                key={selectedOptions}
                className="chip"
                style={{
                  display: selectedOptions ? "" : "none",
                }}
              >
                <p>{selectedOptions}</p>
                <CloseIcon
                  onClick={() => handleSingleClear(selectedOptions)}
                  sx={{
                    fontSize: "8px",
                    marginLeft: "6px",
                  }}
                />
              </div>
            )}
            <div
              className="chip"
              style={{
                backgroundColor: "transparent",
                padding: 0,
                // flex: 1,
                flex: "1 1 auto",
                display: "inline-grid",
                justifyContent: "flex-start",
              }}
              key="dflt"
            >
              <input
                id={name + "-input"}
                autoFocus={open}
                name="typeIn"
                placeholder={label}
                style={{
                  // width: "min-content",
                  // maxWidth: "120px",
                  // flex: "1",
                  padding: 0,
                  // padding: "4px 14px",
                  fontSize: "12px",
                  border: 0,
                  outline: 0,
                }}
              />
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              border: "0px solid red",
            }}
          >
            <CloseIcon
              sx={{
                fontSize: "18px",
                marginLeft: "8px",
                // zIndex: 100,
                display: selectedOptions.length ? "" : "none",
                color: open ? "gray" : "gainsboro",
              }}
              onClick={handleClearFilter}
            />
            <VerticalLine
              sx={{ display: selectedOptions.length ? "" : "none" }}
            />
            <KeyboardArrowDownIcon
              sx={{ color: open ? "gray" : "gainsboro" }}
            />
          </Box>
        </Box>

        <Box
          key={name}
          ref={menuBoxRef}
          sx={{
            boxShadow: "0px 4px 4px rgba(0, 0, 5, 0.25)",
            bgcolor: "white",
            border: "1px solid #c4c4c4",
            borderRadius: "4px",
            minWidth: "180px",
            display: open ? "flex" : "none",
            flexDirection: "column",
            position: "absolute",
            top: "110%",
            left: 0,
            zIndex: 101,
            maxHeight: "240px",
            overflowY: "auto",
          }}
        >
          {SelectedOptions(name, handleMultiSelectChange, selectedOptions)}
        </Box>
      </Box>
    </Box>
  );
}
