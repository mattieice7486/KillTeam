import React from "react";

export const Option = props => (
    <option value={props}>
        {props.children}
    </option>
);
