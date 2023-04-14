import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../common/models/user";
import { fetchUsers } from "./thunk";

export interface AppState {
  loading: boolean;
  error: boolean;
  users: User[];
  rawUsers: User[];
}

const initialState: AppState = {
  loading: false,
  error: false,
  users: [],
  rawUsers: [],
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    sortByName: (state) => {},
    sortByAge: (state) => {
      state.users = [...state.users].sort((a, b) => {
        return a.age - b.age;
      });
    },
    filterByAge: (
      state,
      { payload }: PayloadAction<{ min: number; max: number }>
    ) => {
      state.users = state.rawUsers.filter(
        (user) => user.age >= payload.min && user.age <= payload.max
      );
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
      state.users = payload
        .sort((a, b) => {
          if (a.name.firstName > b.name.firstName) {
            return 1;
          }
          if (a.name.firstName < b.name.firstName) {
            return -1;
          }
          return a.age < b.age ? 1 : -1;
        })
        .filter((v) => !!v);
      state.rawUsers = [...state.users];
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
export const { sortByAge, filterByAge } = AppSlice.actions;

export default AppSlice.reducer;
