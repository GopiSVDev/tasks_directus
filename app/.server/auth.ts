import { registerUser, isDirectusError } from "@directus/sdk";
import type { AuthenticationData } from "@directus/sdk";
import { authClient, client } from "~/.server/directus";

interface AuthData {
  email: string;
  password: string;
}

export const register = async (data: AuthData) => {
  const { email, password } = data;

  try {
    await client.request(registerUser(email, password));
  } catch (error) {
    if (isDirectusError(error)) {
      return error.errors?.[0]?.message || "Something went wrong with Directus";
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Registration failed";
  }
};

export const login = async (data: AuthData): Promise<AuthenticationData> => {
  const { email, password } = data;

  try {
    const res = await authClient.login({ email, password });
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
