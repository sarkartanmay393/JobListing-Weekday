import "./Filters.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ClearIcon from "@mui/icons-material/Clear";
import { TextField, MenuItem, Chip, IconButton } from "@mui/material";
import { Select, OutlinedInput } from "@mui/material";

import { updateFilters, clearFilters } from "../features/jobs/jobsSlice";
import MultipleSelectChip from "../components/inputs/MultipleSelect";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roles = [
  "Android",
  "IOS",
  "Frontend",
  "Backend",
  "Fullstack",
  "DevOps",
  "Data Scientist",
  "QA",
];

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
    <div className="filters">
      <div className="filter">
        <MultipleSelectChip key="roles" name="Roles" options={roles} multiple={true} />
      </div>
      {/* <div className="filter">
        <MultipleSelectChip
          key="noOfEmployees"
          name="No of Employees"
          options={noOfEmployees}
        />
      </div> */}
      {/* <div className="filter">
        <TextField
          label="Experience"
          variant="outlined"
          size="small"
          type="number"
          name="minExperience"
          value={filters.minExperience}
          onChange={handleInputChange}
        />
        {filters.minExperience && (
          <Chip
            label={`${filters.minExperience} years`}
            onDelete={() => handleClearFilter("minExperience")}
            className="filter-chip"
          />
        )}
      </div>
      <div className="filter">
        <TextField
          label="Remote"
          variant="outlined"
          size="small"
          select
          name="isRemote"
          value={filters.isRemote ? "true" : "false"}
          onChange={(e) =>
            dispatch(updateFilters({ isRemote: e.target.value === "true" }))
          }
        >
          <MenuItem value="false">On-Site</MenuItem>
          <MenuItem value="true">Remote</MenuItem>
        </TextField>
      </div>
      <div className="filter">
        <TextField
          label="Tech Stack"
          variant="outlined"
          size="small"
          name="techStack"
          value={filters.techStack}
          onChange={handleInputChange}
          select
        >
          <MenuItem value="react">React</MenuItem>
          <MenuItem value="angular">Angular</MenuItem>
          <MenuItem value="vue">Vue</MenuItem>
        </TextField>
      </div>
      <div className="filter">
        <TextField
          label="Minimum Base Pay"
          variant="outlined"
          size="small"
          type="number"
          name="minBasePay"
          value={filters.minBasePay}
          onChange={handleInputChange}
        />
      </div>
      <div className="filter">
        <TextField
          label="Search Company Name"
          variant="outlined"
          size="small"
          name="companyName"
          value={filters.companyName}
          onChange={handleInputChange}
        />
      </div> */}
    </div>
  );
};

export default Filters;
