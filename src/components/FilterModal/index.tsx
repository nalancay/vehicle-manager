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
  const [filters, setFilters] = useState(initialValues);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleClearFilters = () => {
    setFilters(initialValues);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  useEffect(() => {
    const hasValues = Object.values(filters).some(
      (value) => value.trim() !== ""
    );
    setIsFormFilled(hasValues);
  }, [filters]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Filtrar Vehículos</h2>
        <Field>
          <Label>Tipo de Auto</Label>
          <Input name="type" value={filters.type} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Marca</Label>
          <Input name="make" value={filters.make} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Modelo</Label>
          <Input name="model" value={filters.model} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Año</Label>
          <Input name="year" value={filters.year} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Tipo de Transmisión</Label>
          <Input
            name="transmission"
            value={filters.transmission}
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
              value={filters.minConsumption}
              onChange={handleChange}
            />
            <Label>Max: </Label>
            <RangeInput
              type="number"
              name="maxConsumption"
              value={filters.maxConsumption}
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
