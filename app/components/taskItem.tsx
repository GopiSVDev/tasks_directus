import { Form, Link } from "react-router";
import { formatDate } from "~/utils/helper";
import { Button, Card, Text, Group, Badge, Stack } from "@mantine/core";
import { CheckCircle, Pencil, Trash, RotateCcw } from "lucide-react";
import type { Task } from "~/types/task";

const statusColors: Record<Task["status"], string> = {
  pending: "orange",
  completed: "green",
};

const TaskItem = ({ task }: { task: Task }) => {
  const { id, title, description, date_created, status, dueAt } = task;

  const createdDate = formatDate(date_created);
  const dueDate = formatDate(dueAt);

  return (
    <Card
      withBorder
      shadow="sm"
      radius="md"
      padding="lg"
      mb="md"
      maw={600}
      w="100%"
    >
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Text fw={600} size="lg">
            {title}
          </Text>
          <Badge
            color={statusColors[status]}
            variant="light"
            radius="xl"
            px="md"
          >
            {status}
          </Badge>
        </Group>

        {description && (
          <Text
            c="dimmed"
            size="sm"
            style={{
              wordWrap: "break-word",
              overflowWrap: "anywhere",
              whiteSpace: "pre-wrap",
            }}
          >
            {description}
          </Text>
        )}

        <Group gap="xl" c="dimmed" fz="sm">
          <Text>Created: {createdDate}</Text>
          <Text>Due: {dueDate}</Text>
        </Group>

        <Group gap="sm" mt="sm">
          <Form method="post" action={`/tasks/${id}/edit`}>
            <Button
              type="submit"
              name="status"
              value={status === "pending" ? "completed" : "pending"}
              variant="light"
              radius="xl"
              color={status === "pending" ? "green" : "orange"}
              leftSection={
                status === "pending" ? (
                  <CheckCircle size={16} />
                ) : (
                  <RotateCcw size={16} />
                )
              }
            >
              Mark as {status === "pending" ? "Completed" : "Pending"}
            </Button>
          </Form>

          <Link to={`/tasks/${id}/edit`} style={{ textDecoration: "none" }}>
            <Button
              color="blue"
              variant="light"
              radius="xl"
              leftSection={<Pencil size={16} />}
            >
              Edit
            </Button>
          </Link>

          <Form
            method="post"
            action={`/tasks/${id}/delete`}
            onSubmit={(e) => {
              if (
                !window.confirm("Are you sure you want to delete this task?")
              ) {
                e.preventDefault();
              }
            }}
          >
            <Button
              type="submit"
              color="red"
              variant="light"
              radius="xl"
              leftSection={<Trash size={16} />}
            >
              Delete
            </Button>
          </Form>
        </Group>
      </Stack>
    </Card>
  );
};

export default TaskItem;
