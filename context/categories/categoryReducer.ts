
import { ICategory } from "../../interfaces";
import { CategoryState } from "./CategoryProvider";



type CategoryActionType = 
   | { type: '[Auth] - GetCategories', payload: ICategory[] } 


export const categoryReducer = ( state: CategoryState, action: CategoryActionType ): CategoryState => {

   switch (action.type) {
        case '[Auth] - GetCategories':
            return {
                ...state,
                isLoading: true,
                categories: [...action.payload]
                
            }

       default:
          return state;
   }

}