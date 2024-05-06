import "./Filters.css";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { OutlinedInput, Box } from "@mui/material";

import { updateFilters } from "../store/slices/jobsSlice";
import MultipleSelectChip from "./inputs/MultipleSelect";

import "./inputs/MultipleSelect.css";


const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.jobs.filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFilters({ [name]: value }));
  };

  return (
    <div className="filters">
      <MultipleSelectChip
        key="roles"
        name="roles"
        label="Roles"
        multiple={true}
        options={[
          "Engineering*",
          "Frontend",
          "Backend",
          "Fullstack",
          "Android",
          "IOS",
          "DevOps",
          "Data Scientist",
          "QA",
        ]}
      />
      <MultipleSelectChip
        key="noOfEmployees"
        name="noOfEmployees"
        label="No of Employees"
        multiple={true}
        options={["0-10", "11-50", "51-200", "201-500", "501-1000"]}
      />
      <MultipleSelectChip
        key="minExperience"
        name="minExperience"
        label="Experience"
        multiple={false}
        options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
      />
      <MultipleSelectChip
        key="locationType"
        name="locationType"
        label="Location Type"
        multiple={true}
        options={["Remote", "Onsite"]}
      />

      <MultipleSelectChip
        key="minBasePay"
        name="minBasePay"
        label="Minimum Base Pay"
        multiple={false}
        options={[
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
        ]}
      />
      <Box
        className="filter-box"
        key="companyNameBox"
        sx={{
          position: "relative",
          border: "0px solid red",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label
          id="filter-label-mobile"
          htmlFor="companyName"
          style={{
            position: "absolute",
            top: "-26px",
            left: "4px",
            fontSize: "14px",
            textWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          Search Company Name
        </label>
        <OutlinedInput
          id="filter-company-name"
          size="small"
          placeholder="Search Company Name"
          name="companyName"
          value={filters.companyName}
          onChange={handleInputChange}
          inputProps={{ style: { padding: "8.5px 14px", fontSize: "14px" } }}
        />
      </Box>
    </div>
  );
};

export default Filters;
