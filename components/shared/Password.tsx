"use client";
import { EyeCloseIcon, EyeIcon } from "@/constants";
import { cn } from "@/lib";
import { useState } from "react";

function Password({
  label = "",
  labelClass = "",
  wrapper = "",
  innerWrapper = "",
  id = "password",
  className = "",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col gap-1 ${wrapper}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className={`label ${labelClass}`} htmlFor="">
            {label}
          </label>
        </div>
      )}
      <label
        htmlFor={id}
        className={cn("flex items-center input cursor-text", innerWrapper)}
      >
        <input
          type={showPassword ? "text" : "password"}
          className={cn("w-full border-none outline-none", className)}
          autoComplete="false"
          {...rest}
          id={id}
        />
        <button
          type="button"
          className="border-none outline-none cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeIcon className="size-4" />
          ) : (
            <EyeCloseIcon className="size-4" />
          )}
        </button>
      </label>
    </div>
  );
}

export default Password;
