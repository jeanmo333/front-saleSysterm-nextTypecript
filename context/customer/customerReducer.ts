
import { ICustomer } from "../../interfaces";
import { CustomerState } from "./CustomerProvider";

type CustomerActionType = 
   | { type: '[Auth] - GetCustomers', payload: ICustomer[] } 


export const customerReducer = ( state: CustomerState, action: CustomerActionType ): CustomerState => {

   switch (action.type) {
        case '[Auth] - GetCustomers':
            return {
                ...state,
                isLoading: true,
                customers: [...action.payload]
                
            }

       default:
          return state;
   }

}