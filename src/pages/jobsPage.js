import "./jobsPage.css";

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { capitalizeWords } from "../util";
import JobCard from "../components/JobCard";
import { fetchJobs } from "../features/jobs/jobsSlice";

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
    dispatch(fetchJobs({ limit: LIMIT, offset }));
  }, [dispatch, offset]);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter((job) => {
        return (
          (filters.minExperience === "" ||
            (job.minExp !== null &&
              job.minExp >= parseInt(filters.minExperience, 10))) &&
          (!filters.locationType.length ||
            filters.locationType.includes(
              job.location === "remote" ? "Remote" : "Onsite"
            )) &&
          (!filters.companyName ||
            (job.companyName &&
              job.companyName
                .toLowerCase()
                .includes(filters.companyName.toLowerCase()))) &&
          (!filters.location ||
            (job.location &&
              job.location
                .toLowerCase()
                .includes(filters.location.toLowerCase()))) &&
          (!filters.roles.length ||
            (job.jobRole &&
              filters.roles.includes(capitalizeWords(job.jobRole)))) &&
          (filters.minBasePay === "" ||
            (job.minJdSalary !== null &&
              job.minJdSalary >=
                parseInt(
                  filters.minBasePay.substring(0, filters.minBasePay.length - 1)
                )))
        );
      })
    );
  }, [jobs, filters]);

  return (
    <Box className="jobsPage">
      <Box className="jobListing">
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
        {status === "loading" && <CircularProgress />}
      </Box>
    </Box>
  );
};

export default JobsPage;
