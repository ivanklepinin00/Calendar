import styled from "styled-components";

export const CalendarFiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 10px;
`;

export const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FileProcessContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 130px;
  margin-right: 30px;

  button {
    min-width: 130px;
    height: 25px;
  }

  input[type="file"] {
    display: none;
  }
`;
