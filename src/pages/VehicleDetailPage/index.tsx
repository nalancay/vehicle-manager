import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { ContentStyle, LinkStyle } from "./VehicleDetailPage.styles";

const generateRandomLocation = (): LatLngExpression => {
  const lat = -34.6 + (Math.random() - 0.5) * 0.1;
  const lng = -58.4 + (Math.random() - 0.5) * 0.1;
  return [lat, lng];
};

const ButtonBack = (props: any) => {
  const { textButton, pathLink, icon } = props;

  return (
    <ContentStyle>
      <LinkStyle to={pathLink} role="link">{`${textButton}`}</LinkStyle>{" "}
      <i className={icon} /> <span>Detalles de ubicación del vehículo</span>
    </ContentStyle>
  );
};

const VehicleDetailPage: React.FC = () => {
  const { typeCar, model, year } = useParams<{
    typeCar: string;
    model: string;
    year: string;
  }>();

  const location = generateRandomLocation();

  return (
    <div>
      <ButtonBack
        textButton="Vehiculos"
        pathLink="/"
        icon="fa-solid fa-chevron-right"
      />
      <h2>
        {typeCar} - {model} - {year}
      </h2>
      <div role="presentation-map">
        <MapContainer
          center={location}
          zoom={12}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={location} />
        </MapContainer>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
