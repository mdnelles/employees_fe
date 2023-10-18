import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Extend expect with Jest DOM matchers
import { App } from "../../src/App"; // Import App without curly braces

// A simple test to check if the component renders without crashing
test("renders the App component", () => {
   render(<App />);
   const loadingElement = screen.getByText("Loading..."); // Adjust this based on your loading element

   expect(loadingElement).toBeInTheDocument();
});

// import FallbackComponent from "../../src/components/FallbackComponent";
// import ErrorBoundary from "../../src/components/ErrorBoundary"; // Fix the typo in "ErrorBoundry"
// import { render, screen } from "@testing-library/react"; // Import render and screen from @testing-library/react
// import "@testing-library/jest-dom";
// import { App } from "../App";
// import FallbackComponent from "../components/FallbackComponent";
// import ErrorBoundary from "../components/ErrorBoundry"; // Fix the typo in "ErrorBoundry"

// // A simple test to check if the component renders without crashing
// test("renders the App component", () => {
//    render(
//       <ErrorBoundary fallbackComponent={<FallbackComponent />}>
//          <App />
//       </ErrorBoundary>
//    );
//    const loadingElement = screen.getByText("Loading..."); // Adjust this based on your loading element

//    expect(loadingElement).toBeInTheDocument();
// });
