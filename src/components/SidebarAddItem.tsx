import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

type SidebarAddItemProps = {
  type: string;
};

const SidebarAddItem: React.FC<SidebarAddItemProps> = ({ type }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <Link
      to={`/add/${type.replace(/\s/g, "+")}`}
      className="opacity-50 hover:opacity-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button>Add Item {isHovered && `to ${type}`}</Button>
    </Link>
  );
};

export default SidebarAddItem;
