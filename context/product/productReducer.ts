
import { ICategory, IProduct } from "../../interfaces";
import { ProductState } from "./ProductProvider";




type ProductActionType = 
   | { type: '[Auth] - GetProducts', payload: IProduct[] } 


export const productReducer = ( state: ProductState, action: ProductActionType ): ProductState => {

   switch (action.type) {
        case '[Auth] - GetProducts':
            return {
                ...state,
                isLoading: true,
                products: [...action.payload]
                
            }

       default:
          return state;
   }

}