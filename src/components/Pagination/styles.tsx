import styled from "styled-components";

export const Li = styled.li`
  list-style: none;
  padding: 2px;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 10px;
  flex: 0 0 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: var(--color-gray-500);
    transition: ease-in-out color 0.15s;
    & > i {
      color: var(--color-gray-400);
      transition: ease-in-out color 0.15s;
    }
  }
`;

export const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-left: 5px;
`;

export const I = styled.i`
  margin: 10px;
  padding: 3px 8px;
  background-color: var(--color-primary-500);
  color: white;
`;
