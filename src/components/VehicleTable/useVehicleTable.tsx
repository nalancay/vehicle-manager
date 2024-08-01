import { useState, useEffect } from "react";
import { buildApiUrl } from "./VehicleTable.utils";
import { IVehicle } from "../../types/Vehicle";
import { useFetchList } from "../../hooks/useFetchList";
import ApiVehicles from "../../api/vehicles";
import { VehicleTableProps } from "./VehicleTable.types";
import { useNavigate } from "react-router-dom";

export const useVehicleTable = ({
  setCurrentPage,
  filters,
  itemsPerPage,
  currentPage,
}: VehicleTableProps) => {
  const navigate = useNavigate();

  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [sortedVehicles, setSortedVehicles] = useState<IVehicle[]>([]);
  const [sortOrder, setSortOrder] = useState<{ [key: string]: "asc" | "desc" }>(
    {}
  );

  const apiUrl = buildApiUrl(filters);
  const {
    entities: vehicles,
    isLoading,
    errorState,
  } = useFetchList<IVehicle>({
    fetchDataFunction: ApiVehicles.getAllVehicles,
    apiUrl,
  });

  useEffect(() => {
    let filteredVehicles = vehicles;
    if (filters.type) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.class.toLowerCase().includes(filters.type.toLowerCase())
      );
    }
    setSortedVehicles(filteredVehicles);
    setTotalPages(
      Math.ceil(
        filteredVehicles.length > 0 ? filteredVehicles.length / itemsPerPage : 1
      )
    );
  }, [vehicles, filters.type, itemsPerPage, setTotalPages]);

  const sortColumn = (key: string) => {
    const order = sortOrder[key] === "asc" ? "desc" : "asc";
    setSortOrder({ [key]: order });
    const sorted = [...sortedVehicles].sort((a, b) => {
      if (a[key as keyof IVehicle] < b[key as keyof IVehicle])
        return order === "asc" ? -1 : 1;
      if (a[key as keyof IVehicle] > b[key as keyof IVehicle])
        return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortedVehicles(sorted);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVehicles = sortedVehicles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleRowClick = (typeCar: string, model: string, year: number) => {
    navigate(`/vehicle/${typeCar}/${model}/${year}`);
  };

  return {
    isLoading,
    errorState,
    sortColumn,
    sortOrder,
    currentVehicles,
    handlePageChange,
    totalPages,
    handleRowClick,
  };
};
