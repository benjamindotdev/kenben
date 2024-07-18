import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

type SidebarAddItemProps = {
  status: string;
};

const SidebarAddItem: React.FC<SidebarAddItemProps> = ({ status }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <Link
      to={`/add/${status.replace(/\s/g, "+")}`}
      className="opacity-50 hover:opacity-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button>Add Item {isHovered && `to ${status}`}</Button>
    </Link>
  );
};

export default SidebarAddItem;
