import { User, ApiResponse } from "@/types";
import { createContext, useEffect, useState } from "react";
import {
  GetRequestToken,
  GetSessionId,
  GetAccountDetails,
} from "@/server/user";
import { useNavigate, useSearchParams } from "react-router-dom";

type AuthContextProvider = {
  user: User | null;
  login: () => Promise<ApiResponse<string> | void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProvider | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("User");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      localStorage.setItem("User", JSON.stringify(user));
    } else {
      localStorage.removeItem("User");
    }
  }, [user]);

  const login = async () => {
    try {
      const requestTokenResponse = await GetRequestToken();

      if (requestTokenResponse.error) {
        console.error(
          "Error getting request token:",
          requestTokenResponse.error
        );
        return requestTokenResponse;
      }

      const requestToken = requestTokenResponse.data;
      const redirectUrl = encodeURIComponent(
        window.location.origin + "/approved"
      );

      window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectUrl}`;
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const GetUserBySessionId = async (requestToken: string) => {
    try {
      const sessionResponse = await GetSessionId(requestToken);
      if (sessionResponse.error || !sessionResponse.data) {
        console.error("Failed to get session ID:", sessionResponse.error);
        return;
      }

      const sessionId = sessionResponse.data;

      const userResponse = await GetAccountDetails(sessionId);

      if (userResponse.error || !userResponse.data) {
        console.error("Failed to get session ID:", sessionResponse.error);
        return;
      }

      const { id, name, username } = userResponse.data;

      const userData = { id, name, username, sessionId };

      setUser(userData);

      navigate("/");
    } catch (error) {
      console.error("Error getting session ID:", error);
    }
  };

  useEffect(() => {
    const requestToken = searchParams.get("request_token");
    const isApproved = searchParams.get("approved") === "true";

    if (!requestToken) return;

    if (!isApproved) {
      console.warn("User denied authentication.");
      return;
    }

    GetUserBySessionId(requestToken)
  }, [searchParams]);

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
  )

};

