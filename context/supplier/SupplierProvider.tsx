import { FC, useEffect, useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";

import { amatecApi } from "../../api";

import { SuplierContext } from "./SupplierContext";
import { ISupplier } from "../../interfaces";

export const SupplierProvider: FC = ({ children }) => {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

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
      setSuppliers(suppliers);
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
        suppliers,
        // Methods

        getSuppliers,
      }}>
      {children}
    </SuplierContext.Provider>
  );
};
