import React, { useContext } from "react";
import uniqid from "uniqid";

import {
  SmartyContext,
  useQuery,
  useAggregation
} from "../context/smarty-context";
import Table from "./presentational/table/bootstrap";
import PieChart from "./presentational/pie-chart/nivo";
import BarChart from "./presentational/bar-chart/nivo";
import LeafletMap from "./presentational/map/leaflet";

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
    <p>Loading...</p>
  ) : (
    <div>
      {(() => {
        switch (renderer) {
          default:
            return <p>Invalid Renderer</p>;
          case "map":
            return (
              <div className="border m-2">
                <LeafletMap rows={data.results} columns={columns} />
              </div>
            );
          case "table":
            return (
              <div className="container border mt-3 py-4">
                <Table rows={data.results} columns={columns} {...props} />
              </div>
            );
        }
      })()}
    </div>
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

export const SelectedFilters = () => {
  const { filters, removeFilter } = useContext(SmartyContext);
  return filters
    ? filters.map(({ field, value }, i) => (
        <span
          key={uniqid()}
          onClick={e => removeFilter(e.currentTarget.textContent.split(":")[0])}
          className="badge badge-pill badge-secondary m-1"
        >
          {`${field}:${value}`}
        </span>
      ))
    : null;
};

export const ClearFilters = () => {
  const { filters, clearFilters } = useContext(SmartyContext);
  return filters.length ? (
    <button
      type="button"
      className="btn btn-outline-danger ml-2"
      onClick={() => clearFilters()}
    >
      Clear All
    </button>
  ) : null;
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
  const { addFilter } = useContext(SmartyContext);
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
                  field={label}
                  rows={data}
                  addFilter={addFilter}
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
              <div className="border mt-3 py-4" style={{ height: 500 }}>
                <strong>{label}</strong>
                <BarChart
                  field={label}
                  rows={data}
                  addFilter={addFilter}
                  {...props}
                />
              </div>
            );
          case "table":
            return (
              <div className="container border mt-3 py-4">
                <Table
                  field={label}
                  rows={data}
                  addFilter={addFilter}
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
