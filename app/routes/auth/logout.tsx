import { destroySession, getSession } from "~/.server/session";
import { Form, Link, redirect } from "react-router";
import { Box, Button, Stack, Text, Title } from "@mantine/core";
import type { Route } from "../+types/home";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function LogoutRoute() {
  return (
    <Box
      mx="auto"
      my="xl"
      px="md"
      py="xl"
      style={{
        maxWidth: 400,
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <Title order={3} mb="md">
        Logout
      </Title>

      <Text mb="lg">Are you sure you want to log out?</Text>

      <Stack gap="sm">
        <Form method="post">
          <Button type="submit" color="red" fullWidth>
            Logout
          </Button>
        </Form>

        <Button
          component={Link}
          to="/"
          variant="outline"
          color="gray"
          fullWidth
        >
          Never mind
        </Button>
      </Stack>
    </Box>
  );
}
