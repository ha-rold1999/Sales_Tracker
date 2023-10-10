import React from "react";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <p>500 Error</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}
