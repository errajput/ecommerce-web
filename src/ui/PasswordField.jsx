const PasswordField = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        required
      />
    </div>
  );
};
export default PasswordField;
