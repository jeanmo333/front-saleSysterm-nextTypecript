import { FC, useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import axios from "axios";

import { amatecApi } from "../../api";

import { CategoryContext } from "./CategoryContext";
import { ICategory } from "../../interfaces";
import Swal from "sweetalert2";

export const CategoryProvider: FC = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState<ICategory>();

  // useEffect(() => {
  //   getCategories();
  // }, []);

  // const getCategories = async () => {
  //   const token = Cookies.get("token");

  //   if (!token) {
  //     return;
  //   }

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   try {
  //     const { data } = await amatecApi.get("/categories", config);
  //     const { categories } = data;
  //     setCategories(categories);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       return {
  //         hasError: true,
  //         message: error.response?.data.message,
  //       };
  //     }
  //   }
  // };

  const getCategory = async (
    id: string
  ): Promise<{ category?: ICategory; hasError: boolean; message?: string }> => {
    const token = Cookies.get("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await amatecApi.get(`/categories/${id}`, config);
      const { category } = data;
      setCategory(category);

      return {
        hasError: false,
        message: data.message,
        category,
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

  const registerCategory = async (
    category: ICategory
  ): Promise<{
    category?: ICategory;
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
      const { data } = await amatecApi.post("/categories", category, config);
      const { categorySave } = data;
      setCategories([categorySave, ...categories]);
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

  const updateCategory = async (
    category: ICategory
  ): Promise<{ category?: ICategory; hasError: boolean; message?: string }> => {
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
        `/categories/${category.id}`,
        category,
        config
      );

      const { categoryUpdate } = data;

      const categoriesEdit = categories.map((categoryState) =>
        categoryState.id === categoryUpdate.id ? categoryUpdate : categoryState
      );
      setCategories(categoriesEdit);

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

  const deleteCategory = async (id: string) => {
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
          await amatecApi.delete(`/categories/${id}`, config);
          const categoriesUpdate = categories.filter(
            (categoriesState) => categoriesState.id !== id
          );
          setCategories(categoriesUpdate);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        category,
        // Methods

        registerCategory,
        getCategory,
        //getCategories,
        setCategories,
        updateCategory,
        deleteCategory,
      }}>
      {children}
    </CategoryContext.Provider>
  );
};
