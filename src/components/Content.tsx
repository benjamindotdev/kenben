import ToDoCard from "./ToDoCard";
import type { ToDo } from "../types/ToDo";

type ContentProps = {
  toDos: ToDo[];
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
};

const Content: React.FC<ContentProps> = ({ toDos, setToDos }) => {
  return (
    <div className="w-[70%] flex flex-col justify-start align-top gap-6">
      {toDos.map((item: ToDo) => {
        return <ToDoCard key={item.id} {...item} />;
      })}
    </div>
  );
};

export default Content;
