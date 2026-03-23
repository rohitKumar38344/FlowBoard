import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { memo } from "react";

export const TaskItem = memo(({ task }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>0 of 3 subtasks</CardDescription>
      </CardHeader>
    </Card>
  );
});
