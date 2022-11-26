import { ISupplier } from "../../interfaces";
import { SupplierState } from "./SupplierProvider";




type SupplierActionType = 
   | { type: '[Auth] - GetSuppliers', payload: ISupplier[] } 


export const supplierReducer = ( state: SupplierState, action: SupplierActionType): SupplierState => {

   switch (action.type) {
        case '[Auth] - GetSuppliers':
            return {
                ...state,
                isLoading: true,
                suppliers: [...action.payload]
                
            }

       default:
          return state;
   }

}