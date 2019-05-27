import React from "react";

const Table = ({ rows, columns, limit = 20 }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          {columns &&
            columns.map((col, i) => (
              <th key={`col-${i}`} scope="col">
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
              <tr key={`row-${i}`}>
                {columns &&
                  columns.map((col, j) => (
                    <td key={`row-${i}-td-${j}`}>{`${row[col.key]}`}</td>
                  ))}
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default Table;
