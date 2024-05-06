import "./jobsPage.css";

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { capitalizeWords } from "../util";
import JobCard from "../components/JobCard";
import { fetchJobs } from "../store/slices/jobsSlice";

const LIMIT = 10;

const JobsPage = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const { jobs, totalCount, status, filters } = useSelector(
    (state) => state.jobs
  );

  const [filteredJobs, setFilteredJobs] = useState([]);
  const observer = useRef();
  const lastJobElementRef = (node) => {
    if (status === "loading") return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && jobs.length < totalCount) {
        setOffset((prevOffset) => prevOffset + LIMIT);
      }
    });
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    // console.log("fetching jobs", { limit: LIMIT, offset });
    dispatch(fetchJobs({ limit: LIMIT, offset }));
  }, [offset]);

  useEffect(() => {
    const filteredJobs = jobs.filter((job) => {
      const {
        minExperience,
        locationType,
        companyName,
        location,
        roles,
        minBasePay,
      } = filters;

      const isMinExperienceValid =
        minExperience === "" ||
        (job.minExp !== null && job.minExp >= parseInt(minExperience, 10));

      const isLocationTypeValid =
        !locationType.length ||
        locationType.includes(job.location === "remote" ? "Remote" : "Onsite");

      const isCompanyNameValid =
        !companyName ||
        (job.companyName &&
          job.companyName.toLowerCase().includes(companyName.toLowerCase()));

      const isLocationValid =
        !location ||
        (job.location &&
          job.location.toLowerCase().includes(location.toLowerCase()));

      const isRolesValid =
        !roles.length ||
        (job.jobRole && roles.includes(capitalizeWords(job.jobRole)));

      const isMinBasePayValid =
        minBasePay === "" ||
        (job.minJdSalary !== null &&
          job.minJdSalary >=
            parseInt(minBasePay.substring(0, minBasePay.length - 1)));

      return (
        isMinExperienceValid &&
        isLocationTypeValid &&
        isCompanyNameValid &&
        isLocationValid &&
        isRolesValid &&
        isMinBasePayValid
      );
    });

    setFilteredJobs(filteredJobs);
  }, [jobs, filters]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        border: "0px solid red",
      }}
    >
      <Box
        className="jobListing"
        sx={{
          border: "0px solid red",
        }}
      >
        {filteredJobs.map((job, index) => {
          if (index === filteredJobs.length - 1) {
            return (
              <JobCard ref={lastJobElementRef} key={job.jdUid} job={job} />
            );
          } else {
            return <JobCard key={job.jdUid} job={job} />;
          }
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          border: "0px solid red",
          marginY: "16px",
        }}
      >
        {status === "loading" && <CircularProgress size="24px" />}
      </Box>
    </Box>
  );
};

export default JobsPage;
