/**
 * Setup API Service
 * Handles all API calls related to setup configuration
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Category mapping from frontend display names to backend enum values
export const CATEGORY_MAP: Record<string, string> = {
  "Account Summary": "accountSummary",
  "Income Sources": "incomeSources",
  Needs: "needs",
  Wants: "wants",
  Savings: "savings",
  Assets: "accountAssets",
};

// Reverse mapping for display
export const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  accountSummary: "Account Summary",
  incomeSources: "Income Sources",
  needs: "Needs",
  wants: "Wants",
  savings: "Savings",
  accountAssets: "Assets",
};

export interface SetupConfig {
  id: string;
  userId: string;
  accountSummary: string[];
  incomeSources: string[];
  needs: string[];
  wants: string[];
  savings: string[];
  accountAssets: string[];
  paydayDate: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddItemRequest {
  category: string;
  itemName: string;
}

export interface DeleteItemRequest {
  category: string;
  itemName: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode: number;
  };
}

/**
 * Get authentication token from localStorage
 */
const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

/**
 * Get user's setup configuration
 */
export const getSetup = async (): Promise<SetupConfig> => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/setup`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to fetch setup");
  }

  return data.data;
};

/**
 * Update entire setup configuration
 */
export const updateSetup = async (
  setupData: Partial<SetupConfig>
): Promise<SetupConfig> => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/setup`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(setupData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to update setup");
  }

  return data.data;
};

/**
 * Add item to a category
 */
export const addItem = async (
  categoryDisplay: string,
  itemName: string
): Promise<{ category: string; itemName: string; items: string[] }> => {
  const token = getAuthToken();
  const category = CATEGORY_MAP[categoryDisplay];

  if (!category) {
    throw new Error(`Invalid category: ${categoryDisplay}`);
  }

  const response = await fetch(`${API_BASE_URL}/setup/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, itemName }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle specific error cases
    if (response.status === 409) {
      throw new Error(`"${itemName}" already exists in ${categoryDisplay}`);
    }
    throw new Error(data.error?.message || "Failed to add item");
  }

  return data.data;
};

/**
 * Delete item from a category
 */
export const deleteItem = async (
  categoryDisplay: string,
  itemName: string
): Promise<{ category: string; itemName: string; items: string[] }> => {
  const token = getAuthToken();
  const category = CATEGORY_MAP[categoryDisplay];

  if (!category) {
    throw new Error(`Invalid category: ${categoryDisplay}`);
  }

  const response = await fetch(`${API_BASE_URL}/setup/items`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, itemName }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle specific error cases
    if (response.status === 404) {
      throw new Error(`"${itemName}" not found in ${categoryDisplay}`);
    }
    throw new Error(data.error?.message || "Failed to delete item");
  }

  return data.data;
};

/**
 * Validate item name
 */
export const validateItemName = (
  itemName: string
): { valid: boolean; error?: string } => {
  const trimmed = itemName.trim();

  if (!trimmed) {
    return { valid: false, error: "Item name cannot be empty" };
  }

  if (trimmed.length > 100) {
    return {
      valid: false,
      error: "Item name is too long (max 100 characters)",
    };
  }

  return { valid: true };
};

/**
 * Check if item exists in category
 */
export const itemExists = (items: string[], itemName: string): boolean => {
  return items.some((item) => item.toLowerCase() === itemName.toLowerCase());
};
