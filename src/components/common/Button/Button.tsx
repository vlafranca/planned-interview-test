import React, { ComponentPropsWithoutRef, FC } from "react";
import { ButtonWrapper } from "./Button.styled";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

const Button: FC<ButtonProps> = (props) => (
  <ButtonWrapper
    className="rounded-full hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-200"
    type="button"
    {...props}
  >
    {props.children}
  </ButtonWrapper>
);

export default Button;
