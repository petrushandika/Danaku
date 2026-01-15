import api from "../api";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  avatarUrl?: string;
  plan: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: string;
  createdAt: string;
  updatedAt: string;
  userAchievements?: any[];
  members?: any[];
}

export interface UserSettings {
  assetsTarget: number;
  currency: string;
  language: string;
  theme: string;
  emailNotif: boolean;
  pushNotif: boolean;
  marketingNotif: boolean;
  twoFactorEnabled: boolean;
}

export interface UpdateProfileDto {
  name?: string;
  avatarUrl?: string; // For manually setting URL if needed, though uploadAvatar handles file
  phoneNumber?: string;
  birthDate?: string;
  gender?: string;
}

export interface UpdateSettingsDto {
  assetsTarget?: number;
  currency?: string;
  language?: string;
  theme?: string;
  emailNotif?: boolean;
  pushNotif?: boolean;
  marketingNotif?: boolean;
  twoFactorEnabled?: boolean;
}

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/users/profile");
  return response.data.data;
};

export const updateProfile = async (
  data: UpdateProfileDto
): Promise<UserProfile> => {
  const response = await api.put("/users/profile", data);
  return response.data.data;
};

export const getSettings = async (): Promise<UserSettings> => {
  const response = await api.get("/users/settings");
  // The service might return just the object, and ResponseMessage wraps it in 'data'
  return response.data.data;
};

export const updateSettings = async (
  data: UpdateSettingsDto
): Promise<UserSettings> => {
  const response = await api.put("/users/settings", data);
  return response.data.data;
};

export const uploadAvatar = async (
  file: File
): Promise<{ id: string; avatarUrl: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/users/avatar", formData);
  return response.data.data;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.post("/auth/change-password", data);
  return response.data;
};
