export interface User {
  id: string;
  email: string;
  fullName: string;
  username?: string;
  bio?: string;
  avatarUrl?: string;
  role: string;
  isVerified: boolean;
  createdAt: string; // Using string for date serialization
  updatedAt: string;
}
