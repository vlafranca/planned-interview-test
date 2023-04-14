import React, { Dispatch, FocusEvent, useState } from "react";
import { connect } from "react-redux";
import { AppState, filterByAge, sortByAge } from "./store/reducer";
import { RootState } from "./store/store";
import { fetchUsers } from "./store/thunk";

export interface AgeFilter {
  min: number;
  max: number;
}

function AppComponent({ users, dispatch }: AppProps) {
  const [ageFilter, setAgeFilter] = useState<AgeFilter>({ min: 0, max: 100 });
  const setMin = (event: FocusEvent<any>) =>
    setAgeFilter({ ...ageFilter, min: event.target.value });
  const setMax = (event: FocusEvent<any>) =>
    setAgeFilter({ ...ageFilter, max: event.target.value });

  function retrieveUsers() {
    dispatch(fetchUsers(ageFilter));
  }

  function sortAge() {
    dispatch(sortByAge());
  }

  function filterAge() {
    dispatch(filterByAge(ageFilter));
  }
  console.log(users);
  return (
    <>
      <div className="sticky-bar">
        <img src="/logo.svg" />
        <h1>Planned Test</h1>
      </div>
      <div className="App">
        <div className="container">
          <h2>Users</h2>
          <div className="col-layout">
            <div className="col-2 ">
              <div className="filter-container box">
                <button
                  type="button"
                  onClick={retrieveUsers}
                  style={{ alignSelf: "flex-start" }}
                >
                  Retrieve users
                </button>
              </div>
              <div className="filter-container box">
                <input
                  name="minAge"
                  value={ageFilter.min}
                  onChange={setMin}
                  type="number"
                  min={0}
                  max={99}
                />
                <input
                  name="maxAge"
                  max={100}
                  min={1}
                  value={ageFilter.max}
                  onChange={setMax}
                  type="number"
                />
                <button
                  type="button"
                  onClick={filterAge}
                  style={{ alignSelf: "flex-start" }}
                >
                  Filter by age
                </button>
              </div>
            </div>
            <div className="col-3 box">
              <div className="search-bar">
                <input type="text" placeholder="Search user" />
              </div>
              <div className="table-row table-header">
                <div></div>
                <div>
                  Name
                  <img src="sort-arrows.svg" />
                </div>
                <div id="table-sort-age" onClick={() => sortAge()}>
                  Age <img src="sort-arrows.svg" />
                </div>
              </div>
              {!users.length && <div>No result</div>}
              {users.map((user, i) => (
                <div className="table-row" key={i}>
                  <div>
                    <input type="checkbox" />
                  </div>
                  <div>
                    {user.name.firstName} {user.name.lastName}
                  </div>
                  <div>{user.age}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: RootState): AppState => state.app;
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});
type AppProps = AppState & ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
