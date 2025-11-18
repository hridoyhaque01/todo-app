import { ITodoFilter } from "@/types";
import { formatLocalDate } from "./shared";

// todo filters based on due date
export function getTodoFilters(): ITodoFilter[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const addDays = (days: number): string => {
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + days);
    return formatLocalDate(newDate);
  };

  return [
    { label: "Deadline Today", value: formatLocalDate(today) },
    { label: "Expires in 5 days", value: addDays(5) },
    { label: "Expires in 10 days", value: addDays(10) },
    { label: "Expires in 30 days", value: addDays(30) },
  ];
}
