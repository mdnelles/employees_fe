import React, { ReactNode, useState, useEffect } from "react";

interface ErrorBoundaryProps {
   children: ReactNode;
   fallbackComponent?: ReactNode;
}

function ErrorBoundary({ children, fallbackComponent }: ErrorBoundaryProps) {
   const [hasError, setHasError] = useState(false);

   useEffect(() => {
      const handleWindowError = (event: ErrorEvent) => {
         console.error("Global unhandled error:", event.error);
         setHasError(true);
      };

      window.addEventListener("error", handleWindowError);

      return () => {
         window.removeEventListener("error", handleWindowError);
      };
   }, []);

   if (hasError) {
      return fallbackComponent || <div>Something went wrong.</div>;
   }

   return <>{children}</>;
}

export default ErrorBoundary;
