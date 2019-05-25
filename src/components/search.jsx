import React, { useContext } from "react";
import {
  SmartyProvider,
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

export const Search = () => {
  return (
    <SmartyProvider
      defaultKeyword={"restaurant"}
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNEY3dmxHa0I3X0JrT1g5bVQwbjEiLCJ1c2VybmFtZSI6IndtaGFmaXoiLCJ1c2VyX3R5cGUiOiJ1c2VyIn0sImlhdCI6MTU1MzU3MTk1MCwiZXhwIjoxNTg1MTI5NTUwfQ.wz_s0ef7OkizBIztv_6MZp6Uaooapwd6xGukcyBwIEg"
    >
      <div className="container">
        <div className="row">
          <div className="col-6">
            <SingleFilter
              entity="poi"
              label="State"
              keywordField="name"
              field="state"
              limit={5}
            />

            <SingleFilter
              entity="poi"
              label="City"
              keywordField="name"
              field="city"
              limit={4}
            />

            <SingleFilter
              entity="poi"
              label="Category"
              keywordField="name"
              field="desc2"
              limit={3}
              renderer="bar"
            />

            <SingleFilter
              entity="poi"
              label="Subcategory"
              keywordField="name"
              field="desc3"
              limit={10}
              renderer="table"
            />
          </div>
          <div className="col-6">
            <Searchbar />
            <br />

            <SearchResult
              renderer="table"
              entity="poi"
              keywordField="name"
              columns={[
                {
                  label: "POI",
                  key: "name"
                },
                {
                  label: "Category1",
                  key: "desc1"
                },
                {
                  label: "Category2",
                  key: "desc2"
                },
                {
                  label: "State",
                  key: "state"
                }
              ]}
            />
          </div>
        </div>
      </div>
    </SmartyProvider>
  );
};

export default Search;
