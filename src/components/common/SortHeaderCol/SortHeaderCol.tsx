import React, { ComponentPropsWithoutRef, FC } from "react";
import { SortHeaderColWrapper } from "./SortHeaderCol.styled";

interface SortHeaderColProps extends ComponentPropsWithoutRef<"div"> {}

const SortHeaderCol: FC<SortHeaderColProps> = (props) => (
  <SortHeaderColWrapper role="button" {...props}>
    {props.children}
    <img src="sort-arrows.svg" />
  </SortHeaderColWrapper>
);

export default SortHeaderCol;
