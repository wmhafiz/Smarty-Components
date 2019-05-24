import React, { useContext } from "react";
import {
  SmartyProvider,
  SmartyContext,
  useQuery,
  useAggregation
} from "../context/smarty-context";

const Table = ({ rows, columns, limit = 20 }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          {columns &&
            columns.map((col, i) => (
              <th key={i} scope="col">
                {col.label}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows
            .slice(0, limit)
            .map((row, i) => (
              <tr key={i}>
                {columns && columns.map(col => <td>{`${row[col.key]}`}</td>)}
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export const SearchResult = ({ entity, columns, keywordField, ...props }) => {
  const { data, isLoading } = useQuery({
    entity,
    keywordField
  });
  return isLoading ? (
    <p>Loading..</p>
  ) : (
    <Table rows={data.results} columns={columns} {...props} />
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

export const Filters = ({ entity, keywordField, keys, label, ...props }) => {
  const { data, isLoading } = useAggregation({
    entity,
    keywordField,
    keys
  });
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <Table
      rows={data}
      columns={[
        {
          label,
          key: "key1"
        },
        {
          label: "Count",
          key: "count"
        }
      ]}
      {...props}
    />
  );
};

export const Search = () => {
  return (
    <SmartyProvider
      defaultKeyword={"KFC"}
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNEY3dmxHa0I3X0JrT1g5bVQwbjEiLCJ1c2VybmFtZSI6IndtaGFmaXoiLCJ1c2VyX3R5cGUiOiJ1c2VyIn0sImlhdCI6MTU1MzU3MTk1MCwiZXhwIjoxNTg1MTI5NTUwfQ.wz_s0ef7OkizBIztv_6MZp6Uaooapwd6xGukcyBwIEg"
    >
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Filters
              entity="poi"
              label="State"
              keywordField="name"
              keys={["state"]}
              limit={3}
            />

            <Filters
              entity="poi"
              label="City"
              keywordField="name"
              keys={["city"]}
              limit={3}
            />

            <Filters
              entity="poi"
              label="Category1"
              keywordField="name"
              keys={["desc1"]}
              limit={3}
            />

            <Filters
              entity="poi"
              label="Category2"
              keywordField="name"
              keys={["desc2"]}
              limit={3}
            />

            <Filters
              entity="poi"
              label="Category3"
              keywordField="name"
              keys={["desc3"]}
              limit={3}
            />
          </div>
          <div className="col-9">
            <Searchbar />
            <br />
            <SearchResult
              entity="poi"
              keywordField="name"
              columns={[
                {
                  label: "POI",
                  key: "name"
                },
                // {
                //   label: "Category1",
                //   key: "desc1"
                // },
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
