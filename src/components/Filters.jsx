import "./Filters.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ClearIcon from "@mui/icons-material/Clear";
import { TextField, MenuItem, Chip, IconButton } from "@mui/material";
import { Select, OutlinedInput } from "@mui/material";

import { updateFilters, clearFilters } from "../features/jobs/jobsSlice";
import MultipleSelectChip from "./inputs/MultipleSelect";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const noOfEmployees = ["0-10", "11-50", "51-200", "201-500", "501-1000"];

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.jobs.filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFilters({ [name]: value }));
  };

  const handleClearFilter = (filterName) => {
    dispatch(updateFilters({ [filterName]: "" }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleMultiSelectChange = (e, name) => {
    dispatch(updateFilters({ [name]: e.target.value }));
  };

  return (
    <div className="filters" style={{ border: "1px solid red" }}>
      <div className="filter">
        <MultipleSelectChip
          key="roles"
          name="roles"
          label="Roles"
          multiple={true}
        />
      </div>
      <div className="filter">
        <MultipleSelectChip
          key="noOfEmployees"
          name="noOfEmployees"
          label="No of Employees"
          multiple={true}
        />
      </div>
      <div className="filter">
        <MultipleSelectChip
          key="minExperience"
          name="minExperience"
          label="Experience"
          multiple={false}
        />
      </div>
      <div className="filter">
        <MultipleSelectChip
          key="locationType"
          name="locationType"
          label="Location Type"
          multiple={true}
        />
      </div>
      <div className="filter">
        <MultipleSelectChip
          key="minBasePay"
          name="minBasePay"
          label="Minimum Base Pay"
          multiple={false}
        />
      </div>
      <div className="filter">
        <OutlinedInput
          size="small"
          placeholder="Search Company Name"
          name="companyName"
          value={filters.companyName}
          onChange={handleInputChange}
          sx={{ padding: "0", "& .MuiOutlinedInput-sizeSmall	": { padding: 0 } }}
        />
      </div>
    </div>
  );
};

export default Filters;
