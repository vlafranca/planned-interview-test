import React from "react";

const API_URL = "http://localhost:8099";

function App() {
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
            <div className="col-2 box">
              <div className="filter-container">
                <input name="minAge" value="0" type="number" />
                <input name="maxAge" value="100" type="number" />
                <button type="button" style={{ alignSelf: "flex-start" }}>
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
                <div>
                  Age <img src="sort-arrows.svg" />
                </div>
              </div>
              <div className="table-row">
                <div>
                  <input type="checkbox" />
                </div>
                <div>Name</div>
                <div>Truc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
