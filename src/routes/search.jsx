import React from "react";
import { SingleFilter, Searchbar, SearchResult } from "../components/search";
import { SmartyProvider } from "../context/smarty-context";

const Search = () => {
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
