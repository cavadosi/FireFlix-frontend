import { ApiResponse, MediaList, User } from "@/types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const GetRequestToken = async (): Promise<ApiResponse<string>> => {
  try {
    const response = await fetch(`${baseUrl}/Account/request_token`);

    if (!response.ok) {
      return {
        status: response.status,
        error: `HTTP error! Status: ${response.status}`,
      };
    }
    const data = await response.text();

    return { status: 200, data };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 400,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const GetSessionIdByLogin = async (
  username: string,
  password: string,
  requestToken: string
): Promise<ApiResponse<string>> => {
  try {
    const response = await fetch(`${baseUrl}/Account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, request_token: requestToken }),
    });

    if (!response.ok) {
      return {
        status: response.status,
        error: `HTTP error! Status: ${response.status}`,
      };
    }
    const data = await response.text();

    return { status: 200, data };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 400,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const GetSessionId = async (
  requestToken: string
): Promise<ApiResponse<string>> => {
  try {
    const response = await fetch(
      `${baseUrl}/Account/session/new/${requestToken}`
    );

    if (!response.ok) {
      return {
        status: response.status,
        error: `HTTP error! Status: ${response.status}`,
      };
    }
    const data = await response.text();

    return { status: 200, data };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 400,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const GetAccountDetails = async (
  sessionId: string
): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${baseUrl}/Account/details/${sessionId}`);
    const data = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        error: `HTTP error! Status: ${response.status}`,
      };
    }

    return { status: 200, data };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 400,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const GetUserList = async (
  query: string,
  id: string
): Promise<ApiResponse<MediaList>> => {
  try {
    const response = await fetch(`${baseUrl}/Account/${id}/${query}`);
    const data = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        error: `HTTP error! Status: ${response.status}`,
      };
    }

    return { status: 200, data };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 400,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const MarkAsFavorite = async (
  mediaType: string,
  mediaId: number,
  favorite: boolean,
  accountId: string,
  sessionId: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await fetch(
      `${baseUrl}/Account/${accountId}/mark_as_favorite/${mediaType}/${mediaId}?sessionId=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favorite),
      }
    );

    if (!response.ok) {
      return {
        status: response.status,
        error: `HTTP error! Status: ${response.status}`,
      };
    }

    return { status: 200 };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 400,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const MarkWatchlist = async (
  mediaType: string,
  mediaId: number,
  watchlist: boolean,
  accountId: string,
  sessionId: string
): Promise<ApiResponse<MediaList>> => {
  try {
    const response = await fetch(
      `${baseUrl}/Account/${accountId}/mark_watchlist/${mediaType}/${mediaId}?sessionId=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchlist),
      }
    );

    if (!response.ok) {
      return {
        status: response.status,
        error: `HTTP error! Status: ${response.status}`,
      };
    }

    return { status: 200 };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 400,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
