import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import VehicleDetailPage from "..";
import { act } from "react";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useParams: () => ({ typeCar: "car", model: "modelX", year: "2023" }),
  };
});

jest.mock("react-leaflet", () => ({
  MapContainer: jest.fn(({ children, style }) => (
    <div style={style} role="presentation">
      {children}
    </div>
  )),
  TileLayer: jest.fn(() => null),
  Marker: jest.fn(() => <div role="presentation" />),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("VehicleDetailPage test", () => {
  test("It should show the details of the vehicle and the map", async () => {
    await act(() => {
      renderWithRouter(<VehicleDetailPage />);
    });

    const backButton = await screen.findByRole("link", { name: /Vehiculos/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/");

    const heading = screen.getByText(/car - modelX - 2023/i);
    const mapContainer = screen.getByRole("presentation-map");
    expect(heading).toBeInTheDocument();
    expect(mapContainer).toBeInTheDocument();
  });
});
