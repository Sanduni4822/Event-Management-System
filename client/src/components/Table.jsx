import React from 'react';

const Table = ({ columns, data }) => (
  <div className="overflow-x-auto shadow-sm rounded-lg">
    <table className="min-w-full bg-white border border-gray-200 text-sm text-gray-800">
      <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="px-4 py-3 border border-gray-200 text-center whitespace-nowrap"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition duration-150"
          >
            {Object.values(row).map((val, i) => (
              <td
                key={i}
                className="px-4 py-3 border border-gray-200 text-center"
              >
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
