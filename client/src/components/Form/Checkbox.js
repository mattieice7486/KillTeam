import React from "react";

export const Checkbox = props => (
  <input type="checkbox" {...props} className="">
    {props.children}
  </input>
);
