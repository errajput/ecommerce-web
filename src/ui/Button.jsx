import { cn } from "@/utils/functions";

const Button = ({ label, onClick, className, disabled }) => {
  return (
    <button
      className={cn(
        "bg-gradient-to-r from-emerald-500 to-purple-500 text-white",
        " px-4 h-9 rounded-xl",
        " hover:scale-103 hover:shadow-lg transition-transform duration-200 cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
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
