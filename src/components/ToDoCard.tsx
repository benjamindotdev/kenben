import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

import type { ToDo } from "../types/ToDo";

const ToDoCard = ({
  title,
  description,
  assignee,
  status,
  priority,
  createdDate,
  dueDate,
}: ToDo) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-row justify-center">
          <p className="text-lg">{assignee}</p>
          <p>{status}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-row">
        <p>{priority}</p>
        <p>{createdDate}</p>
        <p>{dueDate}</p>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button>Mark as done</Button>
      </CardFooter>
    </Card>
  );
};

export default ToDoCard;
