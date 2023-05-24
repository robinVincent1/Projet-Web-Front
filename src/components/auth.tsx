import { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  idUser: string;
  setIdUser: React.Dispatch<React.SetStateAction<string>>;
  admin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  idUser: "",
  setIdUser: () => {},
  admin: false,
  setAdmin: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const storedValue = JSON.parse(
      localStorage.getItem("isLoggedIn") as string
    );
    if (storedValue !== null) {
      setIsLoggedIn(storedValue);
    }
    const storedIdFromLocalStorage = JSON.parse(
      localStorage.getItem("idUser") as string
    );
    if (storedIdFromLocalStorage !== null) {
      setIdUser(storedIdFromLocalStorage);
    }

    const token = Cookies.get("jwt") as string;
    const tokenExpiryTime = Cookies.get("tokenExpiryTime");
    const storedIdFromCookie = Cookies.get("idUser");

    const currentTime = new Date().getTime();

    if (token && tokenExpiryTime && currentTime < parseInt(tokenExpiryTime)) {
      setIsLoggedIn(true);
      console.log("Token found:", token);
      if (storedIdFromCookie) {
        setIdUser(storedIdFromCookie);
        console.log("idUser from cookie:", storedIdFromCookie);
      }
    } else {
      setIsLoggedIn(false);
      Cookies.remove("jwt");
      Cookies.remove("tokenExpiryTime");
      Cookies.remove("idUser");
      Cookies.remove("admin")
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("idUser", JSON.stringify(idUser));
    localStorage.setItem("admin", JSON.stringify(admin))
  }, [isLoggedIn, idUser, admin]);

  const value = { isLoggedIn, setIsLoggedIn, idUser, setIdUser, admin, setAdmin };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
