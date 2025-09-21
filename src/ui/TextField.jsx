import { cn } from "@/utils/functions";

const TextField = ({ label, value, onChange, placeholder, className }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        name="name"
        placeholder={placeholder || `Enter your ${label}`}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full px-3 py-2",
          "focus:ring-1 focus:ring-green-500 focus:outline-none",
          "border border-gray-300 rounded-lg ",
          "bg-white",
          className
        )}
        required
      />
    </div>
  );
};

export default TextField;
