import { ApiResponse, MediaList, User } from "@/types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const GetRequestToken = async (): Promise<ApiResponse<string>> => {
  try {
    const response = await fetch(`${baseUrl}/Account/request_token`);
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

const GetSessionId = async (requestToken: string): Promise<ApiResponse<string>> => {
  try {
    const response = await fetch(`${baseUrl}/Account/session/new/${requestToken}`);
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

const GetAccountDetails = async (sessionId: string): Promise<ApiResponse<User>> => {
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

const GetUserList = async (query: string, id: string):Promise<ApiResponse<MediaList>> => {
    try {
        const response = await fetch(`${baseUrl}/Account/${query}/${id}`);
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
}

export default { GetRequestToken, GetSessionId, GetAccountDetails, GetUserList };
