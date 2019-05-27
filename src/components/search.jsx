import React, { useContext } from "react";
import {
  SmartyContext,
  useQuery,
  useAggregation
} from "../context/smarty-context";
import Table from "./presentational/table/bootstrap";
import PieChart from "./presentational/pie-chart/nivo";
import BarChart from "./presentational/bar-chart/nivo";

export const SearchResult = ({
  entity,
  columns,
  keywordField,
  renderer = "table",
  ...props
}) => {
  const { data, isLoading } = useQuery({
    entity,
    keywordField
  });

  return isLoading ? (
    <p>Loading..</p>
  ) : renderer === "table" ? (
    <Table rows={data.results} columns={columns} {...props} />
  ) : (
    <p>Invalid renderer</p>
  );
};

export const Searchbar = () => {
  const { keyword, setKeyword } = useContext(SmartyContext);
  return (
    <div className="md-form mt-0">
      <input
        className="form-control"
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={keyword}
        onChange={event => setKeyword(event.target.value)}
      />
      <br />
    </div>
  );
};

export const SingleFilter = ({
  entity,
  keywordField,
  field,
  label,
  renderer = "pie",
  ...props
}) => {
  const keys = [field];
  const { data, isLoading } = useAggregation({
    entity,
    keywordField,
    keys
  });
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      {(() => {
        switch (renderer) {
          default:
          case "pie":
            return (
              <div className="border mt-3 py-4" style={{ height: 200 }}>
                <strong>{label}</strong>
                <PieChart
                  rows={data}
                  mapper={row => ({
                    id: row.key1,
                    value: row.count
                  })}
                  {...props}
                />
              </div>
            );
          case "bar":
            return (
              <div className="border mt-3 py-4" style={{ height: 200 }}>
                <strong>{label}</strong>
                <BarChart rows={data} {...props} />
              </div>
            );
          case "table":
            return (
              <div className="container border mt-3 py-4">
                <Table
                  rows={data}
                  columns={[
                    {
                      label,
                      key: "key1"
                    },
                    {
                      label: "Value",
                      key: "count"
                    }
                  ]}
                  {...props}
                />
              </div>
            );
        }
      })()}
    </div>
  );
};
