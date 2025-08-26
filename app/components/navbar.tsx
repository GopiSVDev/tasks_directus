import { Link, useLoaderData } from "react-router";
import { Button, Title, Flex, Box, Group } from "@mantine/core";

const Navbar = () => {
  const { loggedIn } = useLoaderData();

  console.log(loggedIn);

  return (
    <Box
      component="header"
      bg="blue.6"
      px="lg"
      py="sm"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Flex align="center" justify="space-between" gap="md">
        <Link to="/">
          <Title
            order={3}
            c="white"
            style={{ cursor: "pointer", letterSpacing: "-0.5px" }}
          >
            Tasks<span style={{ fontWeight: 300 }}>App</span>
          </Title>
        </Link>

        <Group gap="sm">
          {loggedIn ? (
            <>
              <Link to="/create">
                <Button
                  radius="xl"
                  size="sm"
                  variant="white"
                  color="blue"
                  fw={500}
                >
                  New
                </Button>
              </Link>

              <Link to="/logout">
                <Button
                  radius="xl"
                  size="sm"
                  variant="outline"
                  color="white"
                  fw={500}
                >
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  radius="xl"
                  size="sm"
                  variant="white"
                  color="blue"
                  fw={500}
                >
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  radius="xl"
                  size="sm"
                  variant="outline"
                  color="white"
                  fw={500}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </Group>
      </Flex>
    </Box>
  );
};

export default Navbar;
