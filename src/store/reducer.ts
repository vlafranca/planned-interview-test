import { createSlice } from "@reduxjs/toolkit";
import { User } from "../common/models/user";
import { fetchUsers } from "./thunk";

export enum SortingOrder {
  ASC = "ASC",
  DSC = "DSC",
}

export interface AppState {
  loading: boolean;
  error: boolean;
  users: User[];
  sorting: {
    age: SortingOrder;
    name: SortingOrder;
  };
  rawUsers: User[];
}

const initialState: AppState = {
  loading: false,
  error: false,
  users: [],
  sorting: {
    age: SortingOrder.DSC,
    name: SortingOrder.ASC,
  },
  rawUsers: [],
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    sortByNameAction: (state) => {
      state.sorting.name = invertSortingOrder(state.sorting.name);
      state.users = sortUsersByNameWithAge(state.rawUsers, state.sorting.name);
    },
    sortByAgeAction: (state) => {
      state.sorting.age = invertSortingOrder(state.sorting.age);
      state.users = sortUsersByAge(state.rawUsers, state.sorting.age);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, { payload }) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      const truncatedusers = payload.users.filter(
        (user) =>
          user.age >= payload.ageFilter.min && user.age <= payload.ageFilter.max
      );
      state.users = sortUsersByNameWithAge(truncatedusers, state.sorting.name);
      state.rawUsers = [...truncatedusers];
    });
    builder.addCase(fetchUsers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { sortByAgeAction, sortByNameAction } = AppSlice.actions;

export default AppSlice.reducer;

function sortUsersByNameWithAge(users: User[], sortingOrder: SortingOrder) {
  const prefix = computeSortingPrefix(sortingOrder);

  return [...users]
    .sort((a, b) => {
      if (a.name.firstName > b.name.firstName) {
        return 1 * prefix;
      }
      if (a.name.firstName < b.name.firstName) {
        return -1 * prefix;
      }
      return a.age < b.age ? 1 : -1;
    })
    .filter((v) => !!v);
}

function sortUsersByAge(users: User[], sortingOrder: SortingOrder) {
  const prefix = computeSortingPrefix(sortingOrder);

  return [...users].sort((a, b) => {
    if (a.age > b.age) {
      return 1 * prefix;
    }
    if (a.age < b.age) {
      return -1 * prefix;
    }
    return 0;
  });
}

function invertSortingOrder(sortingOrder: SortingOrder) {
  return sortingOrder === SortingOrder.ASC
    ? SortingOrder.DSC
    : SortingOrder.ASC;
}

function computeSortingPrefix(sortingOrder: SortingOrder) {
  return sortingOrder === SortingOrder.ASC ? +1 : -1;
}
