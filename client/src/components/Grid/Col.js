import React from "react";

export const Col = ({ size, children }) => (
  <div className={size.split(" ").map(size => "col-" + size).join(" ")} style={{marginBottom:"10px"}}>
    {children}
  </div>
);
