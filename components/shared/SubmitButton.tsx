"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  text,
  loadingText,
  ...props
}: {
  text?: string;
  loadingText?: string;
  [key: string]: any;
}) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" {...props}>
      {pending ? loadingText : text}
    </button>
  );
}
