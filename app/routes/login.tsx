import { Form, redirect } from "react-router";
import type { Route } from "../+types/root";
import { login } from "~/.server/auth";
import { commitSession, getSession, getUserSession } from "~/.server/session";
import type { AuthenticationData } from "@directus/sdk";
import {
  Box,
  Button,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";

export async function loader({ request }: Route.LoaderArgs) {
  const { loggedIn, headers } = await getUserSession(request);

  if (loggedIn) {
    return redirect("/", headers);
  }

  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  try {
    const data: AuthenticationData = await login({ email, password });
    const session = await getSession(request.headers.get("Cookie"));

    const { refresh_token, access_token, expires_at } = data;

    session.set("accessToken", access_token ?? "");
    session.set("refreshToken", refresh_token ?? "");
    session.set("expiresAt", expires_at ?? 0);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Action failed");
    }

    throw new Error("Action failed");
  }
}

const Login = () => {
  return (
    <Box
      mx="auto"
      my="xl"
      px="lg"
      py="xl"
      style={{
        maxWidth: 400,
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        backgroundColor: "#fff",
      }}
    >
      <Title order={2} ta="center" mb="lg">
        Login
      </Title>

      <Form method="post">
        <Stack gap="md">
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="••••••••"
            required
          />

          <Button type="submit" fullWidth>
            Login
          </Button>
        </Stack>
      </Form>
    </Box>
  );
};

export default Login;
