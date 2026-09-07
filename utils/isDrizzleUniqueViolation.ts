// a real error object, that has a cause property and the cause is a error object, taht has a code string property
type DrizzleUniqueViolation = Error & { cause: Error & { code: string } };
// the instance of Error must work - instead of a new object type keeps Errors real behavior (.message, .stack, instanceof) while adding the extra fields on top

export function isDrizzleUniqueViolation(
  error: unknown, // it starts as unknown - error keep the shape - can later use it error.cause.code
): error is DrizzleUniqueViolation {
  return (
    error instanceof Error &&
    error.cause instanceof Error &&
    "code" in error.cause &&
    error.cause.code === "SQLITE_CONSTRAINT_UNIQUE"
  );

  // inspect the .message for speific table or column name
  // error.cause.message.includes("users_table.email"), error.cause.message.includes("bookmarks_table")
}
