import { createContext } from "react";
import { IUser } from "../../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  users? :IUser[];
  isLoading: boolean;

  loginUser: (
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;


  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;


  logout: () => void;
  userAuth: () => void;
  
  forgetPassword: (email: string) => Promise<{
    hasError: boolean;
    message?: string;
  }>;

}

export const AuthContext = createContext({} as ContextProps);
