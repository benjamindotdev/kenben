import { Check, Delete, Pencil, Timer } from "lucide-react";
import { Button } from "./ui/button";

interface MiniButtonProps {
  type: "Done" | "Delete" | "Edit" | "Backlog";
}

const MiniButton: React.FC<MiniButtonProps> = ({ type }) => {
  const renderIcon = () => {
    switch (type) {
      case "Done":
        return <Check size={16} />;
      case "Delete":
        return <Delete size={16} />;
      case "Edit":
        return <Pencil size={16} />;
      case "Backlog":
        return <Timer size={16} />;
      default:
        return "Button";
    }
  };
  return <span className="">{renderIcon()}</span>;
};

export default MiniButton;
