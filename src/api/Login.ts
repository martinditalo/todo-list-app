import axios from "axios";
import { LoginDataResponse } from "./types";

export const getLoginData = async (): Promise<LoginDataResponse[]> => {
  const apiUrl = `https://65eae55443ce16418932bf44.mockapi.io/todoList/users`;
  const res = await axios.get<LoginDataResponse[]>(apiUrl);
  return res.data;
};
