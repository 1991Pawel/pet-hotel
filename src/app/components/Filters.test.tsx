import { render, fireEvent, waitFor, act } from "@testing-library/react";
import * as nextNavigation from "next/navigation";
import Filters from "./Filters";
import React from "react";
import "@testing-library/jest-dom";

// ✅ MOCK next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => null,
    getAll: () => [],
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// ✅ MOCK actions
jest.mock("@/app/actions/locationActions", () => ({
  getHotelsLocation: () => Promise.resolve([]),
}));

describe("Filters component", () => {
  it("renders without crashing", () => {
    render(<Filters />);
  });
  it("renders all animal type checkboxes", () => {
    const { getByLabelText } = render(<Filters />);
    expect(getByLabelText("Psy")).toBeInTheDocument();
    expect(getByLabelText("Koty")).toBeInTheDocument();
    expect(getByLabelText("Inne")).toBeInTheDocument();
  });
});
