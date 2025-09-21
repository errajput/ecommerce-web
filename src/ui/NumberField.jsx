const NumberField = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        placeholder="Enter the Number"
        value={value}
        onChange={onChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:outline-none"
      />
    </div>
  );
};
export default NumberField;
