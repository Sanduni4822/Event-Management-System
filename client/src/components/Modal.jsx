const Modal = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="mb-4">{message}</p>
      <div className="flex justify-end gap-3">
        <button onClick={onCancel} className="text-gray-600">Cancel</button>
        <button onClick={onConfirm} className="text-red-600 font-bold">Confirm</button>
      </div>
    </div>
  </div>
);
export default Modal;