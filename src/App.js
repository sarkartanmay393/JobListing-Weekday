import "./App.css";

import React, { lazy, Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Filters from "./components/Filters";
const JobsPage = lazy(() => import("./pages/jobsPage"));

export default function App() {
  return (
    <Box style={styles.app}>
      <img className="logo" src="/logo.png" alt="Weekday Logo" />
      <Box sx={{ display: "flex", gap: "24px" }}>
        <h3 style={styles.tab}>Applied Jobs</h3>
        <h3 style={styles.activeTab}>Search Jobs</h3>
      </Box>
      <Filters />
      <Suspense
        fallback={
          <div style={{ marginTop: "12px" }}>
            <CircularProgress size="24px" />
          </div>
        }
      >
        <JobsPage />
      </Suspense>
    </Box>
  );
}

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    width: "100vw",
    gap: "20px",
    padding: "24px",
    overflowX: "hidden",
  },
  tab: {
    paddingBottom: "4px",
    fontSize: "16px",
    fontWeight: "normal",
    cursor: "pointer",
    color: "gray",
  },
  activeTab: {
    paddingInline: "8px",
    paddingBottom: "4px",
    fontSize: "16px",
    fontWeight: "normal",
    borderBottom: "1px solid #1959d1",
    cursor: "pointer",
  },
};
