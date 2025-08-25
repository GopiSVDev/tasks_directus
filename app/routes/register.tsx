import { Form, redirect } from "react-router";
import type { Route } from "../+types/root";
import { getUserSession } from "~/.server/session";
import { register } from "~/.server/auth";
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
  let formData = await request.formData();

  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  try {
    await register({ email, password });
    return redirect("/login");
  } catch (error) {
    console.log(error);
  }
}

const Register = () => {
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
        Register
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
            Sign up
          </Button>
        </Stack>
      </Form>
    </Box>
  );
};

export default Register;
