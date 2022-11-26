import { FC, useReducer, useEffect } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import axios from "axios";

import { amatecApi } from "../../api";

import { IProduct } from "../../interfaces";
import { productReducer } from "./productReducer";
import { ProductContext } from "./ProductContext";

export interface ProductState {
  products?: IProduct[];
  isLoading: boolean;
}

const AUTH_INITIAL_STATE: ProductState = {
  products: [],
  isLoading: false
};



export const ProductProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
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
      const { data } = await amatecApi.get("/products", config);
      const { products} = data;
      dispatch({ type: "[Auth] - GetProducts", payload: products });
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
    <ProductContext.Provider
      value={{
        ...state,
        // Methods

        getProducts,

      }}>
      {children}
    </ProductContext.Provider>
  );
};
