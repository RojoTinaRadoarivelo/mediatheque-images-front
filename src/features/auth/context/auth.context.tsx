import { createContext, useContext, useState, useEffect } from "react";
import type { SigninDto, UsersType } from "../users.type";
import { UserService } from "../services/user.service";

type AuthContextType = {
  user: UsersType | null;
  isAuthenticated: boolean;
  login: (data: SigninDto) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const userService = new UserService(); // 🔥 une seule instance globale

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UsersType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (data: SigninDto) => {
    const { session, searchUser } = await userService.logIn(data);

    if (session.success && searchUser.data) {
      setUser(searchUser.data);
      setIsAuthenticated(true);
    }
  };

  const logout = async () => {
    const { userSignout } = await userService.logOut();
    if (userSignout.success) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const refreshingUserData = async () => {
    const { session, searchUser } = await userService.refreshToken();
    if (!localStorage.getItem("SESS_ID")) {
      logout();
    }
    if (session.success && searchUser.data) {
      setIsAuthenticated(true);
      setUser(searchUser.data);
    }
  };

  // 🔥 Rechargement automatique si refresh page
  useEffect(() => {
    const sessId = localStorage.getItem("SESS_ID");
    if (sessId) {
      setIsAuthenticated(true);
      refreshingUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
