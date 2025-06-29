// This dummy export is needed to force TypeScript to emit a .js file for this module.
// This is required for NodeNext module resolution to work correctly with type-only files.
export const _ = {};

export interface SafeUserData {
  id: string;
  email: string;
  fullName: string;
  username?: string;
  bio?: string;
  avatarUrl?: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
