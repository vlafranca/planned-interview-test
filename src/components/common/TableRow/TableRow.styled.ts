import styled from "styled-components";

export const TableRowWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid gray;

  div:not(:first-child) {
    flex: 1;
  }
  div:first-child {
    width: 45px;
  }
`;
