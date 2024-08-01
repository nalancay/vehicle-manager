import styled, { keyframes } from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  cursor: pointer;
  background-color: #007dff;
  color: white;
  text-align: center;
  white-space: nowrap;
`;

export const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden;

  @media (max-width: 890px) {
    overflow-x: auto;
    table {
      display: block;
      width: max-content;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  i {
    font-size: 1.5em;
  }
`;

export const PageInfo = styled.span`
  margin: 0 10px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const CircularProgress = styled.div`
  width: 80px;
  height: 80px;
  border: 4px solid lightgrey;
  border-radius: 50%;
  border-top: 4px solid blue;
  animation: ${rotate} 1s infinite linear;
`;

interface StyledMessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: string;
}

export const StyledMessage = styled.span<StyledMessageProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  color: ${(props) => (props.type === "error" ? "red" : "black")};
  background-color: ${(props) =>
    props.type === "error" ? "#ffebeb" : "white"};
  width: 100%;
  height: 100px;
  text-align: center;
`;
