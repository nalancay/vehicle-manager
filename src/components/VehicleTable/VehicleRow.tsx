import { IVehicle } from "../../types/Vehicle";
import styled from "styled-components";

export const Tr = styled.tr`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;

  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

interface IVehicleRowProps {
  vehicle: IVehicle;
}

const VehicleRow: React.FC<IVehicleRowProps> = ({ vehicle }) => {
  return (
    <>
      <td>{vehicle.class}</td>
      <td>{vehicle.fuel_type}</td>
      <td>{vehicle.make}</td>
      <td>{vehicle.model}</td>
      <td>{vehicle.year}</td>
      <td>{vehicle.transmission}</td>
      <td>{vehicle.city_mpg}</td>
      <td>{vehicle.highway_mpg}</td>
      <td>{vehicle.combination_mpg}</td>
    </>
  );
};

export default VehicleRow;
