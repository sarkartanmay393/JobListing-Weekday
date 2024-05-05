import * as React from "react";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "fit-content",
      minWidth: 180,
    },
  },
};

export default function MultipleSelectChip({ name, options }) {
  const dispatch = useDispatch();
  // const filters = useSelector((state) => state.jobs.filters);
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleChange = (event) => {
    setSelectedOptions(
      typeof value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );
  };

  // const handleClearFilter = (filterName) => {
  //   dispatch(updateFilters({ [filterName]: "" }));
  // };

  return (
    <FormControl sx={{ m: 1, width: "fit-content" }}>
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
        multiple
        name={name}
        value={selectedOptions}
        onChange={handleChange}
        input={
          <OutlinedInput
            color="secondary"
            // placeholder="Roles"
            sx={{
              padding: 0,
              minWidth: "180px",
              height: "fit-content",
            }}
          />
        }
        renderValue={(selected) => (
          <Box
            sx={{
              gap: 0.5,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box className="flex" sx={{ flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <div key={value} className="chip">
                  <p>{value}</p>
                  <CloseIcon fontSize="12px" sx={{ marginLeft: "6px" }} />
                </div>
              ))}
            </Box>
            <CloseIcon fontSize="16px" sx={{ marginLeft: "0px" }} />
            <HorizontalRuleIcon
              className="rotate90"
              style={{ color: "#000f00" }}
            />
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
