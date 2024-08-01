import VehicleRow, { Tr } from "./VehicleRow";
import { IVehicle } from "../../types/Vehicle";
import {
  CircularProgress,
  PageInfo,
  PaginationButton,
  PaginationContainer,
  StyledMessage,
  Table,
  TableContainer,
  Th,
} from "./VehicleTable.styles";
import { useVehicleTable } from "./useVehicleTable";
import { MessageProps, VehicleTableProps } from "./VehicleTable.types";

const createTh = (
  key: keyof IVehicle,
  label: string,
  sortColumn: (key: string) => void,
  sortOrder: { [key: string]: "asc" | "desc" }
) => (
  <Th onClick={() => sortColumn(key)}>
    {label}{" "}
    {sortOrder[key] && (
      <i
        className={`fa-solid fa-caret-${
          sortOrder[key] === "asc" ? "up" : "down"
        }`}
      />
    )}
  </Th>
);

const Message = ({ messageText, type }: MessageProps) => {
  return <StyledMessage type={type}>{messageText}</StyledMessage>;
};

const VehicleTable: React.FC<VehicleTableProps> = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  filters,
}) => {
  const {
    isLoading,
    errorState,
    sortColumn,
    sortOrder,
    currentVehicles,
    handlePageChange,
    totalPages,
    handleRowClick,
  } = useVehicleTable({
    setCurrentPage,
    filters,
    itemsPerPage,
    currentPage,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      {errorState.hasError ? (
        <Message messageText={errorState.message} type="error" />
      ) : (
        <>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  {createTh("class", "Tipo de Auto", sortColumn, sortOrder)}
                  {createTh(
                    "fuel_type",
                    "Tipo de Combustible",
                    sortColumn,
                    sortOrder
                  )}
                  {createTh("make", "Marca", sortColumn, sortOrder)}
                  {createTh("model", "Modelo", sortColumn, sortOrder)}
                  {createTh("year", "Año", sortColumn, sortOrder)}
                  {createTh(
                    "transmission",
                    "Tipo de Transmisión",
                    sortColumn,
                    sortOrder
                  )}
                  {createTh(
                    "city_mpg",
                    "Consumo en Ciudad",
                    sortColumn,
                    sortOrder
                  )}
                  {createTh(
                    "highway_mpg",
                    "Consumo en Carretera",
                    sortColumn,
                    sortOrder
                  )}
                  {createTh(
                    "combination_mpg",
                    "Consumo Mixto",
                    sortColumn,
                    sortOrder
                  )}
                </tr>
              </thead>
              <tbody>
                {currentVehicles.length <= 0 ? (
                  <tr>
                    <td colSpan={9}>
                      <Message
                        messageText={"No hay datos para mostrar"}
                        type="empty"
                      />
                    </td>
                  </tr>
                ) : (
                  currentVehicles.map((vehicle, index) => (
                    <Tr
                      key={index}
                      onClick={() =>
                        handleRowClick(
                          vehicle.class,
                          vehicle.model,
                          vehicle.year
                        )
                      }
                    >
                      <VehicleRow vehicle={vehicle} />
                    </Tr>
                  ))
                )}
              </tbody>
            </Table>
          </TableContainer>
          <PaginationContainer>
            <PaginationButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fa-solid fa-circle-chevron-left" />
            </PaginationButton>
            <PageInfo>{`${currentPage} de ${totalPages}`}</PageInfo>
            <PaginationButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fa-solid fa-circle-chevron-right" />
            </PaginationButton>
          </PaginationContainer>
        </>
      )}
    </>
  );
};

export default VehicleTable;
