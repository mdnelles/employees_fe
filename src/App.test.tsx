import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// A simple test to check if the component renders without crashing
test("renders the App component", () => {
   render(<App />);
   const linkElement = screen.getByText("Loading..."); // Adjust this based on your loading element
   expect(linkElement).toBeInTheDocument();
});
