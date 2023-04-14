import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AgeFilter } from "../App";
import { User, UserResponse } from "../common/models/user";

export const fetchUsers = createAsyncThunk<User[], AgeFilter>(
  "fetchUsers",
  async (ageFilter: AgeFilter) => {
    const response = await Promise.all([
      axios.get<UserResponse>("http://localhost:8099/users/kids"),
      axios.get<UserResponse>("http://localhost:8099/users/adults"),
      axios.get<UserResponse>("http://localhost:8099/users/seniors"),
    ]);

    return response[0].data.data as User[];
  }
);
