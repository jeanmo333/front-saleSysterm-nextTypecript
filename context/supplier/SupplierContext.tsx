import { createContext } from "react";
import { ISupplier } from "../../interfaces";

interface ContextProps {
  suppliers?: ISupplier[];

  getSuppliers: () => void;
}

export const SuplierContext = createContext({} as ContextProps);
