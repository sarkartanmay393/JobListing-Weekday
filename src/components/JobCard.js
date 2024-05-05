import "./JobCard.css";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Box, CircularProgress } from "@mui/material";
import { common } from "@mui/material/colors";

const JobCard = ({ job }) => {
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

  const toCamelCase = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toUpperCase() : word.toLowerCase();
      })
      .replace(/\s+/g, "");
  };

  const showMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Card className="job-card" key={jdUid} square>
      <CardContent className="job-card-content">
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
          <Box className="flex column" sx={{ gap: "4px" }}>
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
                    {toCamelCase(jobRole)}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontSize: "11px" }}>
                  {location.charAt(0).toUpperCase() + location.substring(1)}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontSize: "15px", fontWeight: 300 }}
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
                  <Box className="fade-bottom" />
                </Typography>
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
        <div className="job-card-content-footer">
          <Button
            href="#"
            sx={{
              textTransform: "none",
              bgcolor: "#83ecc4",
              ":hover": {
                bgcolor: "#83ecc4",
              },
              fontSize: "14px",
              fontWeight: "600",
              color: "black",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            ⚡️ Easy Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
