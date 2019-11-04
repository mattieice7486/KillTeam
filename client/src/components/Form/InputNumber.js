import React from "react";

export const InputNumber = props => (
  <div className="form-group">
    <input type="number" className="form-control"	style={{ "paddingRight": "0", "paddingLeft" : "5px", "backgroundColor" : "#c2c2c2", "fontWeight" : "bold", "textAlign" : "center"  }} readOnly {...props} />
  </div>
);
