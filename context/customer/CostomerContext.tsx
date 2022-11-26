import { createContext } from "react";
import { ICustomer } from "../../interfaces";


interface ContextProps {
  customers?: ICustomer[];
  isLoading: boolean;

  getCustomers: () => void;

}

export const CustomerContext = createContext({} as ContextProps);