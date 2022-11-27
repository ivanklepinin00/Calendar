import axios, { AxiosResponse } from "axios";
import { PublicHoliday } from "./types";

const API_URL = "https://date.nager.at/api/v3";

const Api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

export const NagerApi = {
  getHolidays: (
    year: string,
    countryCode?: string,
  ): Promise<AxiosResponse<PublicHoliday[]>> => {
    return Api.get(`/PublicHolidays/${year}/${countryCode || "UA"}`);
  },
};
