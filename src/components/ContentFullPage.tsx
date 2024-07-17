import { useParams } from "react-router-dom";
import { useItems } from "@/context/ItemsContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import ContentButtons from "./ContentButtons";

const ContentFullPage = () => {
  const { items } = useItems();
  const { paramId } = useParams();
  console.log(paramId);
  const item = items.find((item) => item.id === paramId);
  console.log(item);
  return (
    <>
      {item && (
        <Card>
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
      )}
    </>
  );
};

export default ContentFullPage;
