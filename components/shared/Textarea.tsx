import { cn } from "@/lib";
import { IFInputProps } from "@/types";

const Textarea = ({
  label = "",
  labelClass = "",
  wrapper = "",
  className = "",
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
      <textarea className={cn("input", className)} {...rest} />
      {errorMessage && (
        <p className="text-status-error text-sm -mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Textarea;
