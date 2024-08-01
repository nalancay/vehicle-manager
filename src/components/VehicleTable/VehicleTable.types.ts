export interface VehicleTableProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  itemsPerPage: number;
  filters: any;
}

export type MessageProps = {
  messageText: string;
  type: string;
};
