import React from "react";
import { SmartyProvider } from "../context/smarty-context";
import Widgets from "../components/widgets";

const getWidget = ({ name, props }) => {
  let Widget = Widgets[name];
  return <Widget {...props} />;
};

const Search = props => {
  return (
    <SmartyProvider
      defaultKeyword={"restaurant"}
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNEY3dmxHa0I3X0JrT1g5bVQwbjEiLCJ1c2VybmFtZSI6IndtaGFmaXoiLCJ1c2VyX3R5cGUiOiJ1c2VyIn0sImlhdCI6MTU1MzU3MTk1MCwiZXhwIjoxNTg1MTI5NTUwfQ.wz_s0ef7OkizBIztv_6MZp6Uaooapwd6xGukcyBwIEg"
    >
      <div className="container">
        <div className="row">
          <div className="col-6">{props.sidebar.widgets.map(getWidget)}</div>
          <div className="col-6">{props.main.widgets.map(getWidget)}</div>
        </div>
      </div>
    </SmartyProvider>
  );
};

export default Search;
