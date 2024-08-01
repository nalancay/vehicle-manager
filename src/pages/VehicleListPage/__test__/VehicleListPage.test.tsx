import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import VehicleListPage from "..";
import { useVehicleTable } from "../../../components/VehicleTable/useVehicleTable";

jest.mock("../../../components/VehicleTable/useVehicleTable");

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("VehicleListPage test", () => {
  test("shows the data loading indicator and the filters button", () => {
    (useVehicleTable as jest.Mock).mockReturnValue({
      isLoading: true,
      errorState: { hasError: false, message: "" },
      sortColumn: jest.fn(),
      sortOrder: {},
      currentVehicles: [],
      handlePageChange: jest.fn(),
      totalPages: 1,
      handleRowClick: jest.fn(),
    });

    renderWithRouter(<VehicleListPage />);
    expect(screen.getByText(/Filtros/i)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("shows an error message when it detects there is an error on the server", () => {
    (useVehicleTable as jest.Mock).mockReturnValue({
      isLoading: false,
      errorState: { hasError: true, message: "Error loading data" },
      sortColumn: jest.fn(),
      sortOrder: {},
      currentVehicles: [],
      handlePageChange: jest.fn(),
      totalPages: 1,
      handleRowClick: jest.fn(),
    });

    renderWithRouter(<VehicleListPage />);

    expect(screen.getByText(/Error loading data/i)).toBeInTheDocument();
  });

  test("It should show each property of each vehicle on screen when isLoading is false and there is no error on the server.", () => {
    const currentVehicles = [
      {
        id: "1",
        class: "SUV",
        fuel_type: "Gasoline",
        make: "Toyota",
        model: "RAV4",
        year: 2021,
        transmission: "a",
        city_mpg: 25,
        highway_mpg: 32,
        combination_mpg: 28,
      },
      {
        id: "2",
        class: "Sedan",
        fuel_type: "Electric",
        make: "Tesla",
        model: "Model S",
        year: 2022,
        transmission: "m",
        city_mpg: 102,
        highway_mpg: 105,
        combination_mpg: 103,
      },
    ];

    (useVehicleTable as jest.Mock).mockReturnValue({
      isLoading: false,
      errorState: { hasError: false, message: "" },
      sortColumn: jest.fn(),
      sortOrder: {},
      currentVehicles,
      handlePageChange: jest.fn(),
      totalPages: 1,
      handleRowClick: jest.fn(),
    });

    renderWithRouter(<VehicleListPage />);

    currentVehicles.forEach((vehicle) => {
      expect(screen.getByText(vehicle.class));
      expect(screen.getByText(vehicle.make));
      expect(screen.getByText(vehicle.model));
      expect(screen.getByText(vehicle.year.toString()));
      expect(screen.getByText(vehicle.fuel_type));
      expect(screen.getByText(vehicle.transmission));
      expect(screen.getByText(vehicle.city_mpg.toString()));
      expect(screen.getByText(vehicle.highway_mpg.toString()));
      expect(screen.getByText(vehicle.combination_mpg.toString()));
    });
  });

  test("displays and interacts with the modal filter with the input field model='ferrari'", () => {
    const currentVehicles = [
      {
        id: "1",
        class: "SUV",
        fuel_type: "Gasoline",
        make: "Toyota",
        model: "Ferrari",
        year: 2021,
        transmission: "a",
        city_mpg: 25,
        highway_mpg: 32,
        combination_mpg: 28,
      },
      {
        id: "2",
        class: "Sedan",
        fuel_type: "Electric",
        make: "Tesla",
        model: "Ferrari",
        year: 2022,
        transmission: "m",
        city_mpg: 102,
        highway_mpg: 105,
        combination_mpg: 103,
      },
    ];
    (useVehicleTable as jest.Mock).mockReturnValue({
      isLoading: false,
      errorState: { hasError: false, message: "" },
      sortColumn: jest.fn(),
      sortOrder: {},
      currentVehicles: [],
      handlePageChange: jest.fn(),
      totalPages: 1,
      handleRowClick: jest.fn(),
    });

    renderWithRouter(<VehicleListPage />);
    fireEvent.click(screen.getByText(/Filtros/i));
    expect(screen.getByText(/Filtrar Vehículos/i)).toBeInTheDocument();
    (useVehicleTable as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      errorState: { hasError: false, message: "" },
      sortColumn: jest.fn(),
      sortOrder: {},
      currentVehicles,
      handlePageChange: jest.fn(),
      totalPages: 1,
      handleRowClick: jest.fn(),
    });
    const modelInput = screen.getByLabelText(/Modelo/i);
    fireEvent.change(modelInput, { target: { value: "Ferrari" } });
    fireEvent.click(screen.getByText(/Aplicar/i));
    expect(screen.queryByText(/Filtrar Vehículos/i)).not.toBeInTheDocument();

    currentVehicles.forEach((vehicle) => {
      expect(screen.getByText(vehicle.class));
      expect(screen.getByText(vehicle.make));
      expect(screen.getAllByText(vehicle.model));
      expect(screen.getByText(vehicle.year.toString()));
      expect(screen.getByText(vehicle.fuel_type));
      expect(screen.getByText(vehicle.transmission));
      expect(screen.getByText(vehicle.city_mpg.toString()));
      expect(screen.getByText(vehicle.highway_mpg.toString()));
      expect(screen.getByText(vehicle.combination_mpg.toString()));
    });
  });
});
