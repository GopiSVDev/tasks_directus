import type { Task } from "~/types/task";
import { Form, useNavigate } from "react-router";
import { formatDateForInput } from "~/utils/helper";
import {
  TextInput,
  Textarea,
  Button,
  Box,
  Alert,
  Stack,
  Group,
} from "@mantine/core";
import { ArrowLeft } from "lucide-react";

type TaskFormProps = {
  task?: Task;
  error?: string;
};

const TaskForm = ({ task, error }: TaskFormProps) => {
  const navigate = useNavigate();

  return (
    <Box mx="auto" my="lg" px="lg" py="md" maw={500} bdrs="md" bg="white">
      <Group mb="md">
        <Button
          variant="subtle"
          radius="xl"
          leftSection={<ArrowLeft size={16} />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Group>

      {error && (
        <Alert color="red" mb="md" radius="md" variant="light">
          {error}
        </Alert>
      )}

      <Form method="post">
        <Stack gap="sm">
          <TextInput
            label="Title"
            name="title"
            defaultValue={task?.title || ""}
            required
          />

          <Textarea
            label="Description"
            name="description"
            autosize
            minRows={3}
            maxRows={10}
            defaultValue={task?.description || ""}
          />

          <TextInput
            label="Due Date"
            name="dueDate"
            type="datetime-local"
            defaultValue={task ? formatDateForInput(task.dueDate) : ""}
            required
            min={formatDateForInput(new Date())}
          />

          <Button type="submit" fullWidth radius="xl">
            {task ? "Save Changes" : "Create Task"}
          </Button>
        </Stack>
      </Form>
    </Box>
  );
};

export default TaskForm;
