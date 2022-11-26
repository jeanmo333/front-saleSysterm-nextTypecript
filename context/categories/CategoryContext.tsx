import { createContext } from "react";
import { ICategory } from "../../interfaces";


interface ContextProps {
  categories?: ICategory[];
  isLoading: boolean;

  getCategories: () => void;

}

export const CategoryContext = createContext({} as ContextProps);