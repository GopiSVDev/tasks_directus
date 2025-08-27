import {
  registerUser,
  isDirectusError,
  login as directusLogin,
  readUsers,
} from "@directus/sdk";
import type { AuthenticationData } from "@directus/sdk";
import { authClient, client } from "~/.server/directus";

interface AuthData {
  email: string;
  password: string;
}

export const register = async ({ email, password }: AuthData) => {
  try {
    const users = await client.request(readUsers());
    const exists = users.some((user) => user.email === email);

    if (exists) {
      throw new Error("Email already exists");
    }

    await client.request(registerUser(email, password));
  } catch (error) {
    console.error("Registration failed:", error);
    throw error instanceof Error ? error : new Error("Registration failed");
  }
};

export const login = async ({
  email,
  password,
}: AuthData): Promise<AuthenticationData> => {
  authClient.setToken(null);

  try {
    return await authClient.request(directusLogin({ email, password }));
  } catch (error) {
    if (isDirectusError(error)) {
      throw new Error(error.errors?.[0]?.message || "Directus login error");
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Login failed");
  }
};
