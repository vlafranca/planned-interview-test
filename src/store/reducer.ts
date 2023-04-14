import { createSlice } from "@reduxjs/toolkit";
import { User } from "../common/models/user";
import { fetchUsers } from "./thunk";

export interface AppState {
  loading: boolean;
  error: boolean;
  users: User[];
}

const initialState: AppState = {
  loading: false,
  error: false,
  users: [],
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    loadDataSuccess: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //   state.value += 1;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(fetchUsers.pending, (state, { payload }) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    });
    builder.addCase(fetchUsers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
    });
    // builder.addCase(updateUser.rejected, (state, action) => {
    //   if (action.payload) {
    //     // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
    //     state.error = action.payload.errorMessage
    //   } else {
    //     state.error = action.error.message
    //   }
    // })
  },
});

// Action creators are generated for each case reducer function
export const { loadDataSuccess } = AppSlice.actions;

export default AppSlice.reducer;
