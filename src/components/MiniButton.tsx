import { Check, Delete, Pencil, Timer } from "lucide-react";
import { useState } from "react";

interface MiniButtonProps {
  type: "Done" | "Delete" | "Edit" | "Backlog";
}

const MiniButton: React.FC<MiniButtonProps> = ({ type }) => {
  const renderIcon = () => {
    switch (type) {
      case "Done":
        return (
          <Check
            className="transition-all ease-in-out duration-300 hover:text-pink-500 hover:scale-150"
            size={16}
          />
        );
      case "Delete":
        return (
          <Delete
            className="transition-all ease-in-out duration-300 hover:text-pink-500 hover:scale-150"
            size={16}
          />
        );
      case "Edit":
        return (
          <Pencil
            className="transition-all ease-in-out duration-300 hover:text-pink-500 hover:scale-150"
            size={16}
          />
        );
      case "Backlog":
        return (
          <Timer
            className="transition-all ease-in-out duration-300 hover:text-pink-500 hover:scale-150"
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
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {renderIcon()}
    </span>
  );
};

export default MiniButton;
