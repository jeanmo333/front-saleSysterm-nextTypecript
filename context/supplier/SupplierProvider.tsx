import { FC, useReducer, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";

import { amatecApi } from "../../api";



import {ISupplier } from "../../interfaces";
import { supplierReducer } from "./supplierReducer";
import { SuplierContext } from "./SupplierContext";

export interface SupplierState {
    suppliers?: ISupplier[];
    isLoading: boolean;
}

const AUTH_INITIAL_STATE: SupplierState = {
    suppliers: [],
    isLoading: false
};



export const SupplierProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(supplierReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
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
      const { data } = await amatecApi.get("/supliers", config);
     const { suppliers } = data;
      dispatch({ type: "[Auth] - GetSuppliers", payload: suppliers });
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
    <SuplierContext.Provider
      value={{
        ...state,
        // Methods

        getSuppliers

      }}>
      {children}
    </SuplierContext.Provider>
  );
};
