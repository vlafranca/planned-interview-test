import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AgeFilter } from "../App";
import { User, UserResponse } from "../common/models/user";

const API_URL = "http://localhost:8099";

export const fetchUsers = createAsyncThunk<
  { users: User[]; ageFilter: AgeFilter },
  AgeFilter
>("fetchUsers", async (ageFilter: AgeFilter) => {
  const response = await Promise.all([
    axios.get<UserResponse>(`${API_URL}/users/kids`),
    axios.get<UserResponse>(`${API_URL}/users/adults`),
    axios.get<UserResponse>(`${API_URL}/users/seniors`),
  ]);

  return {
    ageFilter,
    users: response
      .flatMap((resp) => resp.data.data)
      .filter((v) => !!v) as User[],
  };
});
