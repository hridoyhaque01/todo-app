import { cn } from "@/lib";
import { IFInputProps } from "@/types";

const Input = ({
  label = "",
  labelClass = "",
  wrapper = "",
  className = "",
  type = "text",
  errorMessage = "",
  ...rest
}: IFInputProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-1", wrapper)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className={cn("label", labelClass)}>{label}</label>
        </div>
      )}
      <input type={type} className={cn("input", className)} {...rest} />
      {errorMessage && (
        <p className="text-status-error text-sm -mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
