import { useQuery } from "react-query";
import { getLoginData } from "../api/Login";
import { LoginDataResponse } from "../api/types";

export const useLogin = () => {
  return useQuery<LoginDataResponse[], Error>(["useUserByID"], () =>
    getLoginData()
  );
};
