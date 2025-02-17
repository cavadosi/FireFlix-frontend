import { isValidMediaQuery } from "@/lib/utils";
import type {
  ApiResponse,
  DiscoverMoviesRequest,
  DiscoverTvShowsRequest,
  MediaList,
  Movie,
  TVShow,
} from "@/types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getApiBaseUrl = (mediaType: "movie" | "tv") => {
  return `${baseUrl}/${mediaType}`;
};

const fetchMediaData = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data["watch/providers"]) {
      data.watchProviders = data["watch/providers"];
      delete data["watch/providers"];
    }

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

const GetMediaById = async (
  mediaType: "movie" | "tv",
  id: number,
  region?: string
): Promise<ApiResponse<Movie | TVShow>> => {
  const apiBaseUrl = getApiBaseUrl(mediaType);
  return await fetchMediaData(`${apiBaseUrl}/${id}/details?region=${region}`);
};

const GetRecomendedMedia = async (
  mediaType: "movie" | "tv",
  id: number,
  page: number = 1
): Promise<ApiResponse<MediaList>> => {
  const apiBaseUrl = getApiBaseUrl(mediaType);
  return await fetchMediaData(`${apiBaseUrl}/${id}/recomended/${page}`);
};

const GetSimilarMedia = async (
  mediaType: "movie" | "tv",
  id: number,
  page: number = 1
): Promise<ApiResponse<MediaList>> => {
  const apiBaseUrl = getApiBaseUrl(mediaType);
  return await fetchMediaData(`${apiBaseUrl}/${id}/similar/${page}`);
};

const AddMediaRating = async (
  mediaType: "movie" | "tv",
  id: number,
  value: number,
  sessionId: string
) => {
  if (value < 0 || value > 10) {
    return {
      status: 400,
      error: `Rating must be a value 0-10.`,
    };
  }

  const apiBaseUrl = getApiBaseUrl(mediaType);

  try {
    const response = await fetch(
      `${apiBaseUrl}/${id}/rating/${value}/session_id=${sessionId}`,
      { method: "POST" }
    );

    if (!response.ok) {
      return {
        status: response.status,
        error: `HTTP error! Status: ${response.status}`,
      };
    }

    return { status: 200, message: `${mediaType} rated correctly.` };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 400,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

const DeleteMediaRating = async (
  mediaType: "movie" | "tv",
  id: number,
  sessionId: string
) => {
  const apiBaseUrl = getApiBaseUrl(mediaType);
  try {
    const response = await fetch(
      `${apiBaseUrl}/${id}/rating/session_id=${sessionId}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      return {
        status: response.status,
        error: `HTTP error! Status: ${response.status}`,
      };
    }

    return { status: 200, message: `${mediaType} rating removed.` };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 400,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

const GetMediaList = async (
  mediaType: "movie" | "tv",
  query: string,
  page: number = 1
): Promise<ApiResponse<MediaList>> => {
  if (!isValidMediaQuery(query, mediaType)) {
    return {
      status: 400,
      error: `Invalid query parameter: ${query}.`,
    };
  }

  const apiBaseUrl = getApiBaseUrl(mediaType);
  try {
    const response = await fetch(`${apiBaseUrl}/list/${query}/${page}`);
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
const SearchMedia = async (
  mediaType: "movie" | "tv",
  query: string,
  page: number = 1
) => {
  const apiBaseUrl = getApiBaseUrl(mediaType);
  const encodedQuery = encodeURIComponent(query);

  try {
    const response = await fetch(
      `${apiBaseUrl}/search?query=${encodedQuery}&page=${page}`
    );

    if (!response.ok) {
      return {
        status: response.status,
        error: `HTTP error! Status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { status: 200, data };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 400,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

const DiscoverMedia = async (
  mediaType: "movie" | "tv",
  queryparams: DiscoverMoviesRequest | DiscoverTvShowsRequest
) => {
  const apiBaseUrl = getApiBaseUrl(mediaType);
  try {

    const response = await fetch(`${apiBaseUrl}/discover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryparams),
    });
    
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

export default {
  GetMediaById,
  GetRecomendedMedia,
  GetSimilarMedia,
  GetMediaList,
  AddMediaRating,
  DeleteMediaRating,
  SearchMedia,
  DiscoverMedia,
};
