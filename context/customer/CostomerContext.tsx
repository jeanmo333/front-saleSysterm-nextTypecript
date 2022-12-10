import { createContext } from "react";
import { ICustomer } from "../../interfaces";


interface ContextProps {
  customers?: ICustomer[];

 // getCustomers: () => void;

 
 registerCustomer: (
  category: ICustomer
) => Promise<{customer?: ICustomer;  hasError?: boolean; message?: string }>;

updateCustomer: (
  category: ICustomer
) => Promise<{customer?: ICustomer; hasError?: boolean; message?: string }>;

 getCustomer: (
  id: string
) => Promise<{ customer?: ICustomer; hasError?: boolean; message?: string }>;


deleteCustomer: (id: string) => void;

}

export const CustomerContext = createContext({} as ContextProps);