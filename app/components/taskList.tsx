import { Stack, Text, Paper } from "@mantine/core";
import TaskItem from "./taskItem";
import type { FullTask } from "~/types/task";

const TaskList = ({ tasks }: { tasks: FullTask[] | [] }) => {
  return (
    <Stack gap="lg" align="center" w="100%" my="md">
      {tasks.length === 0 ? (
        <Paper
          withBorder
          shadow="xs"
          radius="md"
          p="lg"
          ta="center"
          c="dimmed"
          maw={600}
          w="100%"
        >
          <Text fw={500}>No Tasks Yet</Text>
          <Text size="sm">Start by creating your first task 🎯</Text>
        </Paper>
      ) : (
        <Stack px="sm" py="md" gap="md">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default TaskList;
