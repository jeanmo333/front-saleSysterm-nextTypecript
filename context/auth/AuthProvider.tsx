import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import axios from "axios";

import { AuthContext} from "./";

import { amatecApi } from "../../api";
import { IUser } from "../../interfaces";



export const AuthProvider: FC = ({ children }) => {
  const router = useRouter();

  const [users, setUsers] = useState<IUser[]>([]);
  const [auth, setAuth] = useState<IUser>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const userAuth = async () => {
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
        const { data } = await amatecApi.get("/auth/perfil", config);
        const { token, ...user } = data;
        Cookies.set("token", token)
        setAuth(user);
        setIsLoggedIn(true);
        //router.push("/admin");
        setIsLoggedIn(true);
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

        setUsers(users);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return {
            hasError: true,
            message: error.response?.data.message,
          };
        }
      }
    };

    userAuth(), getUsers();
    
  }, []);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await amatecApi.post("/auth/login", {
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      setAuth(user);
      setIsLoggedIn(true);
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
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await amatecApi.post("/auth/forgetPassword", { email });
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
    router.push("/");
    setAuth(undefined);
    Cookies.remove("token");
   
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        users,
        isLoggedIn,

        // Methods
        loginUser,
        registerUser,
        logout,
        forgetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
