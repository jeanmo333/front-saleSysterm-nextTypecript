import { FC, useReducer, useEffect } from "react";
import { useRouter } from "next/router";


import Cookies from "js-cookie";
import axios from "axios";

import { AuthContext, authReducer } from "./";

import { amatecApi } from "../../api";
import { IUser } from "../../interfaces";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
  users?: IUser[];
  isLoading: boolean;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
  users: [],
  isLoading: false
};

export const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    userAuth();

    getUsers();

  }, []);
  
    const userAuth = async () => {
      const token = Cookies.get("token");

      if (!token) {
        return router.push("/");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await amatecApi.get("/auth/perfil", config);
        router.push("/admin");
        const { token, ...user } = data;
        Cookies.set("token", token);
        dispatch({ type: "[Auth] - Login", payload: user });
      } catch (error) {
        Cookies.remove("token");
        if (axios.isAxiosError(error)) {
          return {
            hasError: true,
            message: error.response?.data.message,
          };
        }
      }

    };




  
    const getUsers = async () => {
      const token = Cookies.get("token");
  
      if (!token) {
        return;
      }
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await amatecApi.get("/auth/users", config);
        const { users } = data;
        dispatch({ type: "[Auth] - GetAllUsers", payload: users });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return {
            hasError: true,
            message: error.response?.data.message,
          };
        }
      }
    };
  
 


  const loginUser = async (
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }>=> {
    try {
      const { data } = await amatecApi.post("/auth/login", {
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return {
        hasError: false,
        message: data.message,
      };
   
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await amatecApi.post("/auth/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
     
      //Cookies.set('token', token );
      dispatch({ type: "[Auth] - Login", payload: user });
      return {
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };


  const forgetPassword = async (
    email: string
  ): Promise<{ hasError: boolean; message?: string }>=> {
    try {
      const { data } = await amatecApi.post(
        "/auth/forgetPassword",
        { email }
      );
      return {
        hasError: false,
        message: data.message,
      };
   
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };



  const logout = () => {
    router.reload();
    Cookies.remove('token');
    
  };



  return (
    <AuthContext.Provider
      value={{
        ...state,
     
        // Methods
        loginUser,
        registerUser,
        logout,
        forgetPassword,
        userAuth
        
      }}>
      {children}
    </AuthContext.Provider>
  );
};
