import { cn } from "@/utils/functions";

const Button = ({ label, onClick, className, disabled }) => {
  return (
    <button
      className={cn(
        "bg-green-500 text-white px-4 h-9 rounded-xl hover:bg-green-600 hover:scale-105 shadow-sm transition-all text-sm",
        "cursor-pointer",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
