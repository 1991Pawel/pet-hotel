import * as React from "react";

function InputErrorMessage({
  errorMessage,
}: {
  errorMessage: string | undefined;
}) {
  return <span className="text-red-500 text-xs">{errorMessage}</span>;
}

export { InputErrorMessage };
