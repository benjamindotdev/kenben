import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { Item } from "../types/Item";
import { Link } from "react-router-dom";
import ContentButtons from "./ContentButtons";

type ContentCardProps = {
  item: Item;
};

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  return (
    <Link to={item.id} className="text-white hover:text-white">
      <Card className="opacity-50 hover:opacity-100">
        <CardHeader className="flex flex-row justify-center align-middle">
          <CardTitle>{item.title}</CardTitle>
          <div className="flex flex-row justify-start align-baseline gap-2">
            <p className="text-lg">
              from{" "}
              <strong className="text-pink-200 font-normal">
                {item.assignee}
              </strong>
            </p>
            <p className="text-lg">
              {" on "}
              <strong className="text-pink-200 font-normal">
                {item.createdDate}
              </strong>
            </p>
            <p className="text-lg">
              {" by "}
              <strong className="text-pink-200 font-normal">
                {item.dueDate}
              </strong>
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CardDescription>{item.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-row justify-between ">
          <ContentButtons itemId={item.id} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ContentCard;
