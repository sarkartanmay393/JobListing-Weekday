import "./jobsPage.css";

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import JobCard from "../components/JobCard";
import Filters from "../components/Filters";
import { fetchJobs } from "../features/jobs/jobsSlice";
import { Box } from "@mui/material";

const LIMIT = 10;

const JobsPage = () => {
  const dispatch = useDispatch();
  const { jobs, totalCount, status, filters } = useSelector(
    (state) => state.jobs
  );
  const [offset, setOffset] = useState(0);

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
    // console.log("fetching jobs", offset);
    dispatch(fetchJobs({ limit: LIMIT, offset }));
  }, [dispatch, offset]);

  useEffect(() => {
    console.log("jobs", jobs);
  }, [jobs]);

  // const filteredJobs = jobs.filter((job) => {
  //   return (
  //     (filters.minExperience === 0 ||
  //       (job.maxExp !== null && job.maxExp >= filters.minExperience)) &&
  //     (!filters.companyName ||
  //       (job.companyName &&
  //         job.companyName
  //           .toLowerCase()
  //           .includes(filters.companyName.toLowerCase()))) &&
  //     (!filters.location ||
  //       (job.location &&
  //         job.location
  //           .toLowerCase()
  //           .includes(filters.location.toLowerCase()))) &&
  //     (!filters.roles.length ||
  //       (job.jobRole && filters.roles.includes(job.jobRole))) &&
  //     (filters.minBasePay === 0 ||
  //       (job.minJdSalary !== null && job.minJdSalary >= filters.minBasePay))
  //   );
  // });

  const filteredJobs = jobs;
  // console.log(filteredJobs);

  return (
    <Box className="jobListing">
      {filteredJobs.map((job, index) => {
        if (index === filteredJobs.length - 1) {
          return <JobCard ref={lastJobElementRef} key={job.jdUid} job={job} />;
        } else {
          return <JobCard key={job.jdUid} job={job} />;
        }
      })}
      {status === "loading" && <CircularProgress />}
    </Box>
  );
};

export default JobsPage;
