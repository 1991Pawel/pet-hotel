export function assertString(
  value: unknown,
  errorMessage: string
): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(errorMessage);
  }
}

export function createChatId(a: string, b: string): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}
