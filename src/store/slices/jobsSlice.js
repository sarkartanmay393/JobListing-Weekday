import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  totalCount: 0,
  status: "idle",
  error: null,
  filters: {
    roles: [],
    noOfEmployees: [],
    minExperience: "",
    locationType: [],
    minBasePay: "",
    companyName: "",

    // location: "",
    // techStack: [],
  },
};

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ limit, offset }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit,
      offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );
    const data = await response.json();
    return data;
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        // console.log("fetch jobs pending", state);
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        const tempMap = {};
        [...state.jobs, ...action.payload.jdList].forEach((job) => {
          tempMap[job.jdUid] = {
            ...job,
            jobDetailsFromCompany: ["", "", "", "", ""]
              .map(() => job.jobDetailsFromCompany)
              .join(" "),
          };
        });
        // console.log("tempMail", tempMap);

        state.status = "succeeded";
        state.jobs = Object.values(tempMap);
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        console.log("fetch jobs rejected", state, action);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateFilters, clearFilters } = jobsSlice.actions;

export default jobsSlice.reducer;
