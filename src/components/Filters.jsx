import "./Filters.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { OutlinedInput } from "@mui/material";

import { updateFilters } from "../store/slices/jobsSlice";
import MultipleSelectChip from "./inputs/MultipleSelect";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.jobs.filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFilters({ [name]: value }));
  };

  return (
    <div className="filters">
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
          inputProps={{ style: { padding: "8.5px 14px", fontSize: "14px" } }}
        />
      </div>
    </div>
  );
};

export default Filters;
