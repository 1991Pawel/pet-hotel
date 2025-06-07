import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CheckboxState = boolean | "indeterminate";

export function getCheckboxGroupStatus(...values: boolean[]): CheckboxState {
  const allChecked = values.every(Boolean);
  const someChecked = values.some(Boolean);

  if (allChecked) return true;
  if (someChecked) return "indeterminate";
  return false;
}

export function assertString(
  value: unknown,
  errorMessage: string
): asserts value is string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(errorMessage);
  }
}
