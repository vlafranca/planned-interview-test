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
  margin-bottom: 2rem;
`;

const StickyBar = styled.div`
  position: fixed;
  top: 0;
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
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
      <StickyBar>
        <img className="h-full" src="/logo.svg" />
        <HeaderTitle>Planned Test</HeaderTitle>
      </StickyBar>
      <div className="App">
        <div className="container">
          <PageTitle>Users</PageTitle>
          <div className="col-layout">
            <div className="w-full md:w-1/3">
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
            <Card className="flex-1">
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
