import React, { useContext } from "react";
import {
  SmartyProvider,
  SmartyContext,
  useQuery
} from "../context/smarty-context";

const Table = ({ data, columns }) => {
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
        {data.results &&
          data.results.map((row, i) => (
            <tr key={i}>
              {columns && columns.map(col => <td>{`${row[col.key]}`}</td>)}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export const SearchResult = ({ entity, columns }) => {
  const { data, isLoading } = useQuery({
    entity
  });
  return isLoading ? <p>Loading..</p> : <Table data={data} columns={columns} />;
};

export const Searchbar = () => {
  const { keyword, setKeyword } = useContext(SmartyContext);
  return (
    <div class="md-form mt-0">
      <input
        class="form-control"
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={keyword}
        onChange={event => setKeyword(event.target.value)}
      />
    </div>
  );
};

export const Search = () => {
  return (
    <SmartyProvider
      keyword={"KFC"}
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNEY3dmxHa0I3X0JrT1g5bVQwbjEiLCJ1c2VybmFtZSI6IndtaGFmaXoiLCJ1c2VyX3R5cGUiOiJ1c2VyIn0sImlhdCI6MTU1MzU3MTk1MCwiZXhwIjoxNTg1MTI5NTUwfQ.wz_s0ef7OkizBIztv_6MZp6Uaooapwd6xGukcyBwIEg"
    >
      <Searchbar />
      <SearchResult
        entity="poi"
        columns={[
          {
            label: "POI",
            key: "name"
          },
          {
            label: "Category 1",
            key: "desc1"
          },
          {
            label: "Category 2",
            key: "desc2"
          },
          {
            label: "State",
            key: "state"
          }
        ]}
      />
    </SmartyProvider>
  );
};

export default Search;
