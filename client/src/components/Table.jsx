const Table = ({ columns, data }) => (
  <table className="min-w-full bg-white border text-sm">
    <thead>
      <tr>
        {columns.map((col) => (
          <th
            key={col}
            className="px-4 py-2 border-b text-left whitespace-nowrap font-semibold text-gray-700"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className="hover:bg-gray-100">
          {Object.values(row).map((val, i) => (
            <td key={i} className="px-4 py-2 border-b align-top">{val}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
export default Table;
