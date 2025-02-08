import { User, ApiResponse, UserLists } from "@/types";
import { createContext, useEffect, useState } from "react";
import {
  GetRequestToken,
  GetSessionId,
  GetAccountDetails,
  GetUserList,
} from "@/server/user";
import { useNavigate, useSearchParams } from "react-router-dom";

const UserListEndpoints = [
  { key: "ratedMovies", url: "rated/movies" },
  { key: "favoriteMovies", url: "favorite/movies" },
  { key: "watchlistMovies", url: "watchlist/movies" },
  { key: "ratedTv", url: "rated/tv" },
  { key: "favoriteTv", url: "favorite/tv" },
  { key: "watchlistTv", url: "watchlist/tv" },
];

type AuthContextProvider = {
  user: User | null;
  login: () => Promise<ApiResponse<string> | void>;
  logout: () => void;
  userLists: UserLists;
};

const AuthContext = createContext<AuthContextProvider | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("User");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [region, setRegionCode] = useState<string | null>(user?.region || null);
  const [userLists, setUserLists] = useState<UserLists>(
    () =>
      Object.fromEntries(
        UserListEndpoints.map(({ key }) => [key, null])
      ) as UserLists
  );

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

 
  useEffect(() => {
    if (user?.region) return;
    const getRegionCode = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const regionCode = data.country_code || null;

        if (regionCode && user) {
          
          setUser((prevUser) => prevUser ? { ...prevUser, region: regionCode } : prevUser);
        }

        setRegionCode(regionCode);
      } catch (error) {
        console.warn("Error fetching region code");
        setRegionCode(null);
      }
    };

    getRegionCode();
  }, [user]); // Re-run if user object changes

  useEffect(() => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return { ...prevUser, region };
    });
  }, [region]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("User", JSON.stringify(user));
      fetchUserLists(user.id);
    } else {
      localStorage.removeItem("User");
    }
  }, [user]);

  const fetchUserLists = async (userId: string) => {
    try {
      const responses = await Promise.all(
        UserListEndpoints.map(({ url }) =>
          GetUserList(url, userId).catch(() => null)
        )
      );

      const updatedLists = Object.fromEntries(
        UserListEndpoints.map(({ key }, index) => [
          key,
          responses[index]?.data || null,
        ])
      ) as UserLists;
      setUserLists(updatedLists);
    } catch (error) {
      console.error("Error fetching user lists:", error);
    }
  };

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
      const redirectUrl = encodeURIComponent(window.location.origin);

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
        console.error("Failed to get account details:", userResponse.error);
        return;
      }

      const { id, name, username } = userResponse.data;
      const userData = { id, name, username, sessionId };

      setUser(userData);
      navigate("/");

      await fetchUserLists(userData.id);
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

    GetUserBySessionId(requestToken);
  }, [searchParams]);

  const logout = () => {
    setUser(null);
    setUserLists(
      Object.fromEntries(
        UserListEndpoints.map(({ key }) => [key, null])
      ) as UserLists
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, userLists }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { UserProvider };
