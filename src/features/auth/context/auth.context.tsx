import { createContext, useContext, useState, useEffect } from "react";
import type { SigninDto, SignupDto, UsersType } from "../users.type";
import { AuthService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: UsersType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: SigninDto) => Promise<void>;
  signup: (data: SignupDto) => Promise<void>;
  sendingEmailVerification: (email: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const authService = new AuthService(); // 🔥 une seule instance globale

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UsersType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (data: SigninDto) => {
    const { session, searchUser } = await authService.logIn(data);

    if (session.success && searchUser.data) {
      setUser(searchUser.data);
      setIsAuthenticated(true);
      navigate("/galleries");
    }
  };

  const signup = async (data: SignupDto) => {
    const { session, searchUser } = await authService.SignUp(data);

    if (session.success && searchUser.data) {
      setUser(searchUser.data);
      setIsAuthenticated(true);
      navigate("/galleries");
    }
  };

  const logout = async () => {
    const { userSignout } = await authService.logOut();
    if (userSignout.success) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const sendingEmailVerification = async (email: string) => {
    const { verifiedEmail } = await authService.sendEmailVerification(email);
    if (verifiedEmail.success) {
      localStorage.setItem("sentTo", email);
    }
  };

  const refreshingUserData = async () => {
    const { session, searchUser } = await authService.refreshToken();
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
    const initAuth = async () => {
      if (sessId) {
        setIsAuthenticated(true);
        refreshingUserData();
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        sendingEmailVerification,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
