import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContentStyle = styled.div`
  background-color: transparent;
  border: none;
  padding: 10px 10px;
`;

export const LinkStyle = styled(Link)`
  color: #007dff;
  cursor: pointer;
  &:hover {
    color: #5289e5;
  }
`;
