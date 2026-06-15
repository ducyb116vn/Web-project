import { cn } from "../../../utils";

const Input = ({ label, className, id, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-300 ml-1">
          {label}
        </label>
      )}

      <input
        id={id}
        className={cn(
          "w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white outline-none transition-all",
          "placeholder:text-gray-500 focus:border-neon-pink focus:ring-1 focus:ring-neon-pink",
          className
        )}
        placeholder="Text here..."
        {...props}
      />

    </div>
  );
};

export default Input;