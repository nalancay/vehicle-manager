import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  margin: 14px 0;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  color: #007dff;
  border: 1px solid #007dff;
  background-color: white;
  border-radius: 30px;

  &:hover {
    color: #ffff;
    background-color: #007dff;
    i {
      color: #ffff;
    }
  }

  i {
    color: #007dff;
  }
`;
