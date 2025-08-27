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

export const register = async (data: AuthData) => {
  const { email, password } = data;

  const items = await client.request(readUsers());
  const alreadyExists = items.some((item) => item.email === email);

  if (alreadyExists) {
    throw new Error("Email already exists");
  }

  await client.request(registerUser(email, password));
};

export const login = async (data: AuthData): Promise<AuthenticationData> => {
  const { email, password } = data;

  authClient.setToken(null);

  try {
    const res = await authClient.request(directusLogin({ email, password }));
    return res;
  } catch (error) {
    if (isDirectusError(error)) {
      throw new Error(
        error.errors?.[0]?.message || "Something went wrong with Directus"
      );
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Login Failed");
  }
};
