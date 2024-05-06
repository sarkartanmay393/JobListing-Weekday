import "./jobsPage.css";

import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";

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

  const observer = useRef();
  const lastJobElementRef = useCallback(
    (node) => {
      if (status === "loading") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && jobs.length < totalCount) {
          setOffset((prevOffset) => prevOffset + LIMIT);
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, jobs, totalCount]
  );

  useEffect(() => {
    dispatch(fetchJobs({ limit: LIMIT, offset }));
  }, [dispatch, offset]);

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
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
          locationType.includes(
            job.location === "remote" ? "Remote" : "Onsite"
          );

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
      }),
    [jobs, filters]
  );

  const filteredJobElements = useMemo(() => {
    return filteredJobs.map((job, index) => {
      return (
        <JobCard
          ref={index === filteredJobs.length - 1 ? lastJobElementRef : null}
          key={job.jdUid}
          job={job}
        />
      );
    });
  }, [filteredJobs, lastJobElementRef]);

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
        {filteredJobElements}
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
