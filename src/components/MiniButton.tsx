import { Check, Delete, Pencil, Timer } from "lucide-react";
import { useState } from "react";

interface MiniButtonProps {
  type: "Done" | "Delete" | "Edit" | "Backlog";
  clickHandler?: () => void;
}

const MiniButton: React.FC<MiniButtonProps> = ({ type, clickHandler }) => {
  const renderIcon = () => {
    switch (type) {
      case "Done":
        return (
          <Check
            className="transition-all ease-in-out duration-300 hover:text-pink-300 hover:scale-150"
            size={16}
          />
        );
      case "Delete":
        return (
          <Delete
            className="transition-all ease-in-out duration-300 hover:text-pink-300 hover:scale-150"
            size={16}
          />
        );
      case "Edit":
        return (
          <Pencil
            className="transition-all ease-in-out duration-300 hover:text-pink-300 hover:scale-150"
            size={16}
          />
        );
      case "Backlog":
        return (
          <Timer
            className="transition-all ease-in-out duration-300 hover:text-pink-300 hover:scale-150"
            size={16}
          />
        );
      default:
        return "Button";
    }
  };
  const [hover, setHover] = useState<boolean>(false);
  return (
    <span
      onClick={clickHandler}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {renderIcon()}
    </span>
  );
};

export default MiniButton;
