import { createContext } from "react";
import { ISupplier } from "../../interfaces";


interface ContextProps {
    suppliers?: ISupplier[];
    isLoading: boolean;

    getSuppliers: () => void;

}

export const SuplierContext = createContext({} as ContextProps);