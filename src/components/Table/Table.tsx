import React, { Dispatch, FC } from "react";
import { connect } from "react-redux";
import { User } from "../../common/models/user";
import { sortByAge, sortByName } from "../../store/reducer";
import { RootState } from "../../store/store";
import SortHeaderCol from "../common/SortHeaderCol/SortHeaderCol";
import TableRow from "../common/TableRow/TableRow";
import { TableWrapper } from "./Table.styled";

interface TableProps {
  users: User[];
}

const ResultTable: FC<TableProps & ReturnType<typeof mapDispatchToProps>> = ({
  users,
  dispatch,
}) => {
  function sortAge() {
    dispatch(sortByAge());
  }

  function sortName() {
    dispatch(sortByName());
  }
  return (
    <TableWrapper>
      <TableRow className="table-header p-3 pr-6 pl-6">
        <div></div>
        <SortHeaderCol onClick={sortName}>Name</SortHeaderCol>
        <SortHeaderCol id="table-sort-age" onClick={() => sortAge()}>
          Age
        </SortHeaderCol>
      </TableRow>
      {!users.length && <div className="w-100 p-2 text-center">No result</div>}
      {users.map((user, i) => (
        <TableRow className="p-3 pr-6 pl-6" key={i}>
          <div>
            <input type="checkbox" />
          </div>
          <div>
            {user.name.firstName} {user.name.lastName}
          </div>
          <div>{user.age}</div>
        </TableRow>
      ))}
    </TableWrapper>
  );
};

const mapStateToProps = (state: RootState): TableProps => ({
  users: state.app.users,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultTable);
