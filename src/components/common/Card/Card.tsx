import React, { ComponentPropsWithoutRef, FC } from "react";
import { CardWrapper } from "./Card.styled";

interface CardProps extends ComponentPropsWithoutRef<"div"> {}

const Card: FC<CardProps> = (props) => (
  <CardWrapper
    {...props}
    className={props.className + " card shadow-[0_4px_9px_-4px_#000000]"}
  >
    {props.children}
  </CardWrapper>
);

export default Card;
