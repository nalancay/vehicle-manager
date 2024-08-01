import React, { useState } from "react";
import VehicleTable from "../../components/VehicleTable";
import { Button, PageContainer } from "./VehicleListPage.styles";
import FilterModal from "../../components/FilterModal";

const VehicleListPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleApplyFilters = (filters: any) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  return (
    <PageContainer>
      <Button onClick={handleModalOpen}>
        Filtros <i className="fa-solid fa-filter" />
      </Button>
      <FilterModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onApplyFilters={handleApplyFilters}
      />
      <VehicleTable
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        filters={filters}
      />
    </PageContainer>
  );
};

export default VehicleListPage;
