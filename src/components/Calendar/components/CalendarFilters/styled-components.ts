import styled from "styled-components";

export const CalendarFiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 10px;
`;

export const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const FileProcessWrapper = styled.div`
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
