import { FC, useEffect, useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";

import { amatecApi } from "../../api";

import { ICustomer } from "../../interfaces";
import { CustomerContext } from "./CostomerContext";import Swal from "sweetalert2";
;




export const CustomerProvider: FC = ({ children }) => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [customer, setCustomer] = useState<ICustomer>();


  useEffect(() => {

    getCustomers()
  
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
      setCustomers(customers);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
    }
  };



  const getCustomer = async (
    id: string
  ): Promise<{ customer?: ICustomer; hasError: boolean; message?: string }> => {
    const token = Cookies.get("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await amatecApi.get(`/customers/${id}`, config);
      const { customer } = data;
      setCustomer(customer);

      return {
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "hubo un error",
      };
    }
  };





  const registerCustomer = async (
    customer: ICustomer
  ): Promise<{
    customer?: ICustomer;
    hasError?: boolean;
    message?: string;
  }> => {
    const token = Cookies.get("token");

    if (!token) {
      return {
        hasError: true,
        message: "hubo un error",
      };
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await amatecApi.post("/customers", customer, config);
      const { customerSave } = data;
      setCustomers([customerSave, ...customers]);
      return {
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "hubo un error",
      };
    }
  };

  const updateCustomer = async (
    customer: ICustomer
  ): Promise<{ customer?: ICustomer; hasError: boolean; message?: string }> => {
    const token = Cookies.get("token");

    if (!token) {
      return {
        hasError: true,
        message: "hubo un error",
      };
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await amatecApi.patch(
        `/customers/${customer.id}`,
        customer,
        config
      );

      const { customerUpdate } = data;

      const customersEdit = customers.map((customerState) =>
      customerState.id === customerUpdate.id ? customerUpdate : customerState
      );
      setCustomers(customersEdit);

      return {
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "hubo un error",
      };
    }
  };

  const deleteCustomer = async (id: string) => {
    const token = Cookies.get("token");

    if (!token) {
      return {
        hasError: true,
        message: "hubo un error",
      };
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      Swal.fire({
        title: "Estas Seguro?",
        text: "Esta accion no puede dehacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await amatecApi.delete(`/customers/${id}`, config);
          const customerUpdate = customers.filter(
            (customerState) => customerState.id !== id
          );
          setCustomers(customerUpdate);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <CustomerContext.Provider
      value={{
        customers,
        // Methods

        //getCustomers
        getCustomer,
        registerCustomer,
        updateCustomer,
        deleteCustomer,

      }}>
      {children}
    </CustomerContext.Provider>
  );
};
