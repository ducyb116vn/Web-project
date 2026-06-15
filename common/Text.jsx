import { cn } from "../../../utils";

const Text = ({ children, className = "" }) => {
    return <p className={cn('text-white font-medium', className)}>{children}</p>;
}

export default Text