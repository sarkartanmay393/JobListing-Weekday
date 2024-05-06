import "./App.css";

import React from "react";
import JobsPage from "./pages/jobsPage";
import Filters from "./components/Filters";

import Box from "@mui/material/Box";

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
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

const App = () => {
  return (
    <div style={styles.app}>
      <Box sx={{ display: "flex", gap: "24px" }}>
        <h3 style={styles.tab}>Applied Jobs</h3>
        <h3 style={styles.activeTab}>Search Jobs</h3>
      </Box>
      <Filters />
      <JobsPage />
    </div>
  );
};

export default App;
