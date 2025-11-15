import { cn } from "@/lib";

function ApiErrorText({
  errors,
  className,
}: {
  errors: any;
  className?: string;
}) {
  return (
    errors &&
    "apiError" in errors &&
    errors.apiError && (
      <p className={cn("text-red-900 text-sm  text-left", className)}>
        {errors.apiError}
      </p>
    )
  );
}

export default ApiErrorText;
