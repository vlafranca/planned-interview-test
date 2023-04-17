import React, {
  ChangeEvent,
  Dispatch,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { User } from "../../common/models/user";
import { sortByAgeAction, sortByNameAction } from "../../store/reducer";
import { RootState } from "../../store/store";
import Input from "../common/Input/Input";
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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredUsers(users);
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  }, [users]);

  function sortAge() {
    dispatch(sortByAgeAction());
  }

  function sortName() {
    dispatch(sortByNameAction());
  }

  function filterResults(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.value) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        filteredUsers.filter(
          (user) =>
            user.name.firstName
              .toLowerCase()
              .startsWith(event.target.value.toLowerCase()) ||
            user.name.lastName
              .toLowerCase()
              .startsWith(event.target.value.toLowerCase())
        )
      );
    }
  }

  return (
    <TableWrapper>
      <TableRow className="p-6">
        <Input
          ref={inputRef}
          onChange={filterResults}
          type="text"
          placeholder="Search user"
        />
      </TableRow>
      <TableRow className="table-header p-3 pr-6 pl-6">
        <div></div>
        <SortHeaderCol onClick={sortName}>Name</SortHeaderCol>
        <SortHeaderCol id="table-sort-age" onClick={() => sortAge()}>
          Age
        </SortHeaderCol>
      </TableRow>
      {!filteredUsers.length && (
        <div className="w-100 p-2 text-center">No result</div>
      )}
      {filteredUsers.map((user, i) => (
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
