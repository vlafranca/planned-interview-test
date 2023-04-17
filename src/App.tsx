import React, { Dispatch, FocusEvent, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ResultTable from "./components/Table/Table";
import Button from "./components/common/Button/Button";
import Card from "./components/common/Card/Card";
import Input from "./components/common/Input/Input";
import { AppState } from "./store/reducer";
import { fetchUsers } from "./store/thunk";

export interface AgeFilter {
  min: number;
  max: number;
}

const HeaderTitle = styled.h1`
  font-size: 22px;
`;

const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: bold;
  margin: 2rem 0;
`;

function AppComponent({ dispatch }: AppProps) {
  const [ageFilter, setAgeFilter] = useState<AgeFilter>({ min: 0, max: 100 });
  const setMin = (event: FocusEvent<any>) =>
    setAgeFilter({ ...ageFilter, min: event.target.value });
  const setMax = (event: FocusEvent<any>) =>
    setAgeFilter({ ...ageFilter, max: event.target.value });

  function retrieveUsers() {
    dispatch(fetchUsers(ageFilter));
  }

  return (
    <>
      <div className="sticky-bar">
        <img src="/logo.svg" />
        <HeaderTitle>Planned Test</HeaderTitle>
      </div>
      <div className="App">
        <div className="container">
          <PageTitle>Users</PageTitle>
          <div className="col-layout">
            <div className="col-2 ">
              <Card className="filter-container p-6">
                <Input
                  name="minAge"
                  value={ageFilter.min}
                  onChange={setMin}
                  type="number"
                  min={0}
                  max={99}
                />
                <Input
                  name="maxAge"
                  max={100}
                  min={1}
                  value={ageFilter.max}
                  onChange={setMax}
                  type="number"
                />
                <Button onClick={retrieveUsers}>Retrieve users</Button>
              </Card>
            </div>
            <Card className="col-3">
              <ResultTable></ResultTable>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});
type AppProps = AppState & ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(AppComponent);
