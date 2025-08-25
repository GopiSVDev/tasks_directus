import { useNavigate } from "react-router";
import { Button, Title, Flex, Box } from "@mantine/core";

const Navbar = () => {
  const navigate = useNavigate();

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
        <Title
          order={3}
          c="white"
          style={{ cursor: "pointer", letterSpacing: "-0.5px" }}
          onClick={() => navigate("/")}
        >
          Tasks<span style={{ fontWeight: 300 }}>App</span>
        </Title>

        <Button
          onClick={() => navigate("/")}
          radius="xl"
          size="sm"
          variant="white"
          color="blue"
          fw={500}
        >
          New
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
