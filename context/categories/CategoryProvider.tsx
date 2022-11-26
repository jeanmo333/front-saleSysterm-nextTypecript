import { FC, useReducer, useEffect } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import axios from "axios";

import { amatecApi } from "../../api";


import { CategoryContext } from "./CategoryContext";
import { categoryReducer } from "./categoryReducer";
import { ICategory } from "../../interfaces";

export interface CategoryState {
  categories?: ICategory[];
  isLoading: boolean;
}

const AUTH_INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false
};



export const CategoryProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, AUTH_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
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
      const { data } = await amatecApi.get("/categories", config);
      const { categories } = data;
      dispatch({ type: "[Auth] - GetCategories", payload: categories });
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
    <CategoryContext.Provider
      value={{
        ...state,
        // Methods

        getCategories,

      }}>
      {children}
    </CategoryContext.Provider>
  );
};
