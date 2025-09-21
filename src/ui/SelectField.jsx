import { cn } from "@/utils/functions";

/**
 *
 * @param {{label?: string, value: string, onChange: () => void, options: {value: string, label: string}[]}}
 */
const SelectField = ({ label, value, onChange, options, className }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required
        className={cn(
          "w-full py-2 px-3",
          " border border-gray-300 rounded-lg bg-white",
          " focus:ring-1 focus:ring-green-500 focus:outline-none",
          className
        )}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 text-sm font-medium bg-green-50"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
