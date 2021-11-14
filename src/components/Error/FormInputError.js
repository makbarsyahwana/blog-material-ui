import React from "react";
import { Typography } from "@material-ui/core";

export const FormInputError = ({ text }) => {
  if (text) {
    return (
      <Typography style={{ color: "red", fontSize: "14px" }}>{text}</Typography>
    );
  }
  return null;
};
