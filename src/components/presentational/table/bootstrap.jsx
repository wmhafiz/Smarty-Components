import React from "react";
import uniqid from "uniqid";

const Table = ({ rows, columns, limit = 20, field, addFilter }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          {columns &&
            columns.map((col, i) => (
              <th key={uniqid()} scope="col">
                {col.label}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.slice(0, limit).map((row, i) => (
            <tr key={uniqid()}>
              {columns &&
                columns.map((col, j) => (
                  <td
                    onClick={e =>
                      addFilter &&
                      addFilter({
                        field: field.toLowerCase(),
                        value: e.currentTarget.textContent
                      })
                    }
                    key={uniqid()}
                  >
                    {`${row[col.key]}`}
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
