import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

import type { Item } from "../types/Item";

const ContentCard = ({
  title,
  description,
  assignee,
  status,
  priority,
  createdDate,
  dueDate,
}: Item) => {
  return (
    <Card className="w-[90%]">
      <CardHeader className="flex flex-row justify-center align-middle">
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-col justify-center align-middle">
          <p className="text-lg">{assignee}</p>
          <p>{status}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <p>{priority}</p>
        <p>{createdDate}</p>
        <p>{dueDate}</p>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <Button>Mark as done</Button>
        <Button>Delete</Button>
        <Button>Edit</Button>
        <Button>Backlog</Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
