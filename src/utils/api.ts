import { Event } from "../types/events";
import { API_BASE } from "./config";

interface FetchEventsOptions {
  startDate: Date;
  endDate: Date;
  page?: number;
  perPage?: number;
}

interface PaginationMeta {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
}

interface ApiResponse {
  data: Event[];
  meta: {
    pagination: PaginationMeta;
  };
}

/**
 * Fetch events with optional date filtering and pagination
 */
export const fetchEvents = async ({
  startDate,
  endDate,
  page = 1,
  perPage = 10,
}: FetchEventsOptions): Promise<ApiResponse> => {
  try {
    // Build query parameters
    const params = new URLSearchParams();

    if (startDate) {
      params.append("starts_at", formatDate(startDate));
    }

    if (endDate) {
      params.append("ends_at", formatDate(endDate));
    }

    params.append("page", page.toString());
    params.append("per_page", perPage.toString());

    // Make the API request with proper URL and headers
    const response = await fetch(`${API_BASE}/events?${params}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Handle non-200 responses
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    // Parse the JSON response
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

/**
 * Format a date object to ISO string
 */
const formatDate = (date: Date): string => {
  return date.toISOString(); // Returns full ISO datetime format: 2025-03-22T00:00:00.000Z
};
