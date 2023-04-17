import React, { ComponentPropsWithoutRef, FC } from "react";
import { TableRowWrapper } from "./TableRow.styled";

interface TableRowProps extends ComponentPropsWithoutRef<"div"> {}

const TableRow: FC<TableRowProps> = ({ children, ...props }) => (
  <TableRowWrapper {...props}>{children}</TableRowWrapper>
);

export default TableRow;
