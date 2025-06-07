const Table = ({ columns, data }) => (
  <table className="min-w-full bg-white border">
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col} className="px-4 py-2 border-b text-left">{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className="hover:bg-gray-100">
          {Object.values(row).map((val, i) => (
            <td key={i} className="px-4 py-2 border-b">{val}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
export default Table;