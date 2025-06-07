const Table = ({ columns, data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="px-4 py-2 border border-gray-300 text-center whitespace-nowrap font-semibold text-gray-700"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {Object.values(row).map((val, i) => (
              <td
                key={i}
                className="px-4 py-2 border border-gray-300 text-center align-middle"
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
