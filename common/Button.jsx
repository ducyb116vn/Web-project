import { cn } from "../../../utils";

const Button = ({ children, className, ...props }) => {
    const Component = props.href ? "a" : "button"
  return (
    <Component
      className={cn(
        "inline-block px-10 py-4 bg-gradient-to-br from-neon-pink to-neon-orange text-white rounded-full font-semibold shadow-[0_4px_15px_rgba(255,107,107,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,107,0.4)] transition-all",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;