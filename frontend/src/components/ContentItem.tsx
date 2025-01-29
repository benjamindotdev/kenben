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

type ContentItemProps = {
  item: Item;
};

const ContentItem: React.FC<ContentItemProps> = ({ item }) => {
  return (
    <Card className="opacity-50 hover:opacity-100 border-none  hover:animate-pulse">
      <Link
        to={`${item.id}`}
        className="text-white hover:text-white transition-all hover:ease-in duration-300"
      >
        <CardHeader className="flex flex-col justify-center align-middle">
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
      </Link>
      <CardFooter className="flex flex-row justify-between ">
        <ContentButtons itemId={item.id} status={item.status} />
      </CardFooter>
    </Card>
  );
};

export default ContentItem;
