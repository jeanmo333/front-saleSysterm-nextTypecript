import { AuthState } from './';
import { IUser } from '../../interfaces';


type AuthActionType = 
   | { type: '[Auth] - Login', payload: IUser } 
   | { type: '[Auth] - GetAllUsers', payload: IUser[] } 
   | { type: '[Auth] - Logout' } 


export const authReducer = ( state: AuthState, action: AuthActionType ): AuthState => {

   switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                isLoading: true,
                user: action.payload
                
            }

            case '[Auth] - GetAllUsers':
            return {
                ...state,
                isLoading: true,
                users:[...action.payload] 
                
            }

        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                isLoading: true,
                user: undefined,
            }


       default:
          return state;
   }

}