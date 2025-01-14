import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

export const withRouter = (component: () => React.ReactNode) => () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        {component()}
      </Suspense>
    </BrowserRouter>
  );
};
