const Input = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
    <input {...props} className="w-full p-2 border border-gray-300 rounded" />
  </div>
);
export default Input;