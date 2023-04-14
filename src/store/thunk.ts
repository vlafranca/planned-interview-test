import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AgeFilter } from "../App";
import { User, UserResponse } from "../common/models/user";

const API_URL = "http://localhost:8099";

export const fetchUsers = createAsyncThunk<User[], AgeFilter>(
  "fetchUsers",
  async (ageFilter: AgeFilter) => {
    const response = await Promise.all([
      axios.get<UserResponse>(
        `${API_URL}/users/kids?ageMin=${ageFilter.min}&ageMax=${ageFilter.max}`
      ),
      axios.get<UserResponse>(
        `${API_URL}/users/adults?ageMin=${ageFilter.min}&ageMax=${ageFilter.max}`
      ),
      axios.get<UserResponse>(
        `${API_URL}/users/seniors?ageMin=${ageFilter.min}&ageMax=${ageFilter.max}`
      ),
    ]);

    return response.flatMap((resp) => resp.data.data) as User[];
  }
);
