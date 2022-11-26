import { FC, useReducer, useEffect } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import axios from "axios";

import { amatecApi } from "../../api";

import { ICustomer } from "../../interfaces";
import { customerReducer } from "./customerReducer";
import { CustomerContext } from "./CostomerContext";

export interface CustomerState {
  customers?: ICustomer[];
  isLoading: boolean;
}

const AUTH_INITIAL_STATE: CustomerState = {
  customers: [],
  isLoading: false
};



export const CustomerProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(customerReducer, AUTH_INITIAL_STATE);


  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    const token = Cookies.get("token");

    if (!token) {
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await amatecApi.get("/customers", config);
      const { customers } = data;
      dispatch({ type: "[Auth] - GetCustomers", payload: customers });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        ...state,
        // Methods

        getCustomers

      }}>
      {children}
    </CustomerContext.Provider>
  );
};
