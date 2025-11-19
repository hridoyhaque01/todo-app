"use client";

export const DateDisplay = () => {
  const now = new Date();

  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <p className="text-sm font-medium leading-[100%] text-blue-900">
      <span className="text-base">{dayName}</span> <br /> {formattedDate}
    </p>
  );
};
