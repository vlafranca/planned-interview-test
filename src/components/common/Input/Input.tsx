import React, { ComponentPropsWithRef, FC, forwardRef } from "react";
import { InputWrapper } from "./Input.styled";

interface InputProps extends ComponentPropsWithRef<"input"> {}

const Input: FC<InputProps> = forwardRef((props, ref) => (
  <InputWrapper
    ref={ref}
    {...props}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  ></InputWrapper>
));

export default Input;
