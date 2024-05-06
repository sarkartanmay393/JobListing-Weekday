import "./JobCard.css";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import { capitalizeWords } from "../util";

const JobCard = React.forwardRef(({ job }, ref) => {
  const [loading, setLoading] = useState(false);

  const {
    jdUid,
    jdLink,
    jobDetailsFromCompany,
    maxJdSalary,
    minJdSalary,
    salaryCurrencyCode,
    location,
    minExp,
    jobRole,
    companyName,
    logoUrl,
  } = job;

  const showMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Card
      ref={ref}
      sx={{
        boxShadow: "(0, 0, 0, 0) 0px 1px 4px 0px !important;",
        border: "1px solid #e0e0e0",
      }}
      className="job-card"
      key={jdUid}
      square
    >
      <CardContent
        className="job-card-content"
        sx={{
          border: "0px solid red",
          padding: "16px !important",
          // paddingBottom: "16px ",
        }}
      >
        <div className="job-card-content-header">
          <div className="flex" style={{ gap: "4px" }}>
            <div className="job-card-chip">⏳ Posted 19 days ago</div>
            <div className="job-card-chip">📈 1 applicants</div>
          </div>
          {/* <div class="MuiBox-root css-rmz4vk">
            <span
              class="MuiCircularProgress-root MuiCircularProgress-determinate MuiCircularProgress-colorPrimary css-pn52yy"
              role="progressbar"
              aria-valuenow="100"
              style="width: 50px; height: 50px; transform: rotate(-90deg);"
            >
              <svg
                class="MuiCircularProgress-svg css-13o7eu2"
                viewBox="22 22 44 44"
              >
                <circle
                  class="MuiCircularProgress-circle MuiCircularProgress-circleDeterminate css-nbfpn7"
                  cx="44"
                  cy="44"
                  r="18"
                  fill="none"
                  stroke-width="8"
                  style="stroke-dasharray: 113.097; stroke-dashoffset: 0px;"
                ></circle>
              </svg>
            </span>
            <span
              class="MuiCircularProgress-root MuiCircularProgress-determinate MuiCircularProgress-colorPrimary css-1ar0xbv"
              role="progressbar"
              aria-valuenow="80"
              style="width: 50px; height: 50px; transform: rotate(-90deg);"
            >
              <svg
                class="MuiCircularProgress-svg css-13o7eu2"
                viewBox="22 22 44 44"
              >
                <circle
                  class="MuiCircularProgress-circle MuiCircularProgress-circleDeterminate css-nbfpn7"
                  cx="44"
                  cy="44"
                  r="18"
                  fill="none"
                  stroke-width="8"
                  style="stroke-dasharray: 113.097; stroke-dashoffset: 22.619px;"
                ></circle>
              </svg>
            </span>
            <div
              class="MuiBox-root css-175ywl1"
              aria-label="You have a 80% match score with this job"
            >
              <div class="MuiTypography-root MuiTypography-caption css-8e1tch">
                80%
              </div>
            </div>
          </div> */}
        </div>
        <Box className="flex column job-card-content-content">
          <Box className="flex column" sx={{ gap: "8px" }}>
            <Box style={{ display: "flex", gap: "2px" }}>
              <img
                src={logoUrl || "https://via.placeholder.com/40"}
                alt={`${companyName} logo`}
                className="job-card-logo"
              />
              <Box className="flex column" sx={{ gap: "4px" }}>
                <Box className="flex column" sx={{ gap: "2px" }}>
                  <Typography variant="h3" sx={{ fontSize: "13px" }}>
                    {companyName}
                  </Typography>
                  <Typography variant="h2" sx={{ fontSize: "14px" }}>
                    {capitalizeWords(jobRole)}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontSize: "11px" }}>
                  {location.charAt(0).toUpperCase() + location.substring(1)}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontSize: "15px", fontWeight: 300, textWrap: "nowrap" }}
            >
              {maxJdSalary || minJdSalary
                ? `Estimated Salary: ${salaryCurrencyCode || "$"}${
                    minJdSalary || "40"
                  } - ${maxJdSalary || "60"} LPA ✅`
                : "Salary Information Not Available"}
            </Typography>
            <Box className="flex column" sx={{}}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                About Company:
              </Typography>
              <Box
                sx={{
                  maxHeight: "120px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Typography variant="body2" className="job-description">
                  {`${jobDetailsFromCompany}...`}
                </Typography>
                <Box className="fade-bottom" />
              </Box>
              <Button
                variant="text"
                onClick={showMore}
                disableRipple
                style={{
                  color: "blue",
                  textTransform: "none",
                  fontSize: "0.875rem",
                  fontWeight: "300",
                }}
              >
                {loading ? (
                  <CircularProgress size={18} sx={{ color: "blue" }} />
                ) : (
                  "View job"
                )}
              </Button>
            </Box>
            <Box className="flex column" sx={{}}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Minimum Experience
              </Typography>
              <Typography variant="body2">{`${
                minExp || "N/A"
              } years`}</Typography>
            </Box>
          </Box>
        </Box>
        <div className="job-card-content-footer column">
          <Button
            target="_blank"
            href={jdLink || "#"}
            sx={{
              textTransform: "none",
              bgcolor: "#83ecc4",
              ":hover": {
                bgcolor: "#83ecc4",
              },
              fontSize: "16px",
              fontWeight: "500",
              color: "black",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            ⚡️ Easy Apply
          </Button>
          <Button
            href="#"
            sx={{
              textTransform: "none",
              bgcolor: "#4843d2",
              ":hover": {
                bgcolor: "#4843d2",
              },
              fontSize: "16px",
              fontWeight: "500",
              color: "white",
              borderRadius: "8px",
              width: "100%",
              gap: "16px",
            }}
          >
            <div className="flex" style={{ gap: "6px" }}>
              <Avatar
                sx={{ width: "24px", height: "auto" }}
                src="https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
              />
              <Avatar
                sx={{ width: "24px", height: "auto" }}
                src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/12/avatar-2009-1.jpg"
              />
            </div>
            Unlock referral asks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

export default JobCard;
