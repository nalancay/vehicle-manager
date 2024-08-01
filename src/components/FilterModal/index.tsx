import React, { useState, useEffect } from "react";
import {
  Button,
  Field,
  Input,
  Label,
  ModalContent,
  ModalOverlay,
  RangeInput,
  StylesContainer,
} from "./FilterModal.styles";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
}) => {
  const initialValues = {
    type: "",
    make: "",
    model: "",
    year: "",
    transmission: "",
    minConsumption: "",
    maxConsumption: "",
  };
  const [dataFrom, setDataFrom] = useState(initialValues);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataFrom({
      ...dataFrom,
      [event.target.name]: event.target.value,
    });
  };

  const handleClearFilters = () => {
    setDataFrom(initialValues);
  };

  const handleApplyFilters = () => {
    onApplyFilters(dataFrom);
    onClose();
  };

  useEffect(() => {
    const hasValues = Object.values(dataFrom).some(
      (value) => value.trim() !== ""
    );
    setIsFormFilled(hasValues);
  }, [dataFrom]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Filtrar Vehículos</h2>
        <Field>
          <Label htmlFor="type">Tipo de Auto</Label>
          <Input
            id="type"
            name="type"
            value={dataFrom.type}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label htmlFor="make">Marca</Label>
          <Input
            id="make"
            name="make"
            value={dataFrom.make}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label htmlFor="model">Modelo</Label>
          <Input
            id="model"
            name="model"
            value={dataFrom.model}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label htmlFor="year">Año</Label>
          <Input
            id="year"
            name="year"
            value={dataFrom.year}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label htmlFor="transmission">Tipo de Transmisión</Label>
          <Input
            id="transmission"
            name="transmission"
            value={dataFrom.transmission}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label>Consumo en Ciudad</Label>
          <StylesContainer>
            <Label>Min: </Label>
            <RangeInput
              type="number"
              name="minConsumption"
              value={dataFrom.minConsumption}
              onChange={handleChange}
            />
            <Label>Max: </Label>
            <RangeInput
              type="number"
              name="maxConsumption"
              value={dataFrom.maxConsumption}
              onChange={handleChange}
            />
          </StylesContainer>
        </Field>
        <StylesContainer>
          <Button onClick={handleApplyFilters}>Aplicar</Button>
          <Button disabled={!isFormFilled} onClick={handleClearFilters}>
            Limpiar
          </Button>
          <Button onClick={onClose}>Cerrar</Button>
        </StylesContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FilterModal;
