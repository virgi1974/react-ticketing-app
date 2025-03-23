/**
 * API utilities for fetching events data
 */

// Base URL for the API
const BASE_URL = "/api/v1"; // This will be proxied through Vite

/**
 * Fetch events with optional date filtering and pagination
 *
 * @param {Object} options - Query options
 * @param {Date} options.startDate - Start date for filtering events
 * @param {Date} options.endDate - End date for filtering events
 * @param {number} options.page - Page number for pagination (default: 1)
 * @param {number} options.perPage - Number of events per page (default: 10)
 * @returns {Promise} Promise resolving to events data
 */
export const fetchEvents = async ({
  startDate,
  endDate,
  page = 1,
  perPage = 10,
}) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    // const [perPage] = useState(9); // Make it a constant if you don't plan to change it

    if (startDate) {
      params.append("starts_at", formatDate(startDate));
    }

    if (endDate) {
      params.append("ends_at", formatDate(endDate));
    }

    params.append("page", page);
    params.append("per_page", perPage);

    console.log("----- URL ------", `${BASE_URL}/events?${params}`);

    // Make the API request with proper URL and headers
    const response = await fetch(`${BASE_URL}/events?${params}`, {
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
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

/**
 * Format a date object to YYYY-MM-DD string
 *
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  return date.toISOString(); // Returns full ISO datetime format: 2025-03-22T00:00:00.000Z
};
