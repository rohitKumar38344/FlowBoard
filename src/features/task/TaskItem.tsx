import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { memo } from "react";
import { Link } from "react-router-dom";

export const TaskItem = memo(({ task }) => {
  return (
    <Link to={`task/${task.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>0 of 3 subtasks</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
});
