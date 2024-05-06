import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders job listing page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Search Jobs/i);
  expect(linkElement).toBeInTheDocument();
});
