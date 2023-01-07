---
to: <%= path %>/index.tsx
---
import { type FC } from "react";
<% if (have_props) { -%>
export type <%= name%>Props = {};
<% } -%>

export const <%= name%>: <%- type_annotate %> = <%= props %> => {
  return (
    <div className="">
      <h1><%= name%></h1>
    </div>
  );
};