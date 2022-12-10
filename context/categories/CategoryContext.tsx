import { createContext, Dispatch, SetStateAction } from "react";
import { ICategory } from "../../interfaces";

interface ContextProps {
  categories?: ICategory[] ;
  category?: ICategory ;
 // setCategories:any;
  setCategories: Dispatch<SetStateAction<ICategory[]>>;
  //isLoading: boolean;

  registerCategory: (
    category: ICategory
  ) => Promise<{category?: ICategory;  hasError?: boolean; message?: string }>;

  updateCategory: (
    category: ICategory
  ) => Promise<{category?: ICategory;  hasError?: boolean; message?: string }>;

  getCategory: (
    id: string
  ) => Promise<{ category?: ICategory; hasError?: boolean; message?: string }>;

  deleteCategory: (id: string) => void;

  // deleteCategory: (
  //   id: string
  // ) => Promise<{ hasError?: boolean; message?: string }>;

  

  // getCategories: () => Promise<
  //   | {
  //       hasError: boolean;
  //       message: string;
  //     }
  //   | undefined
  // >;
}

export const CategoryContext = createContext({} as ContextProps);
