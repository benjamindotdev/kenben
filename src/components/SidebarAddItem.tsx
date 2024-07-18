import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type SidebarAddItemProps = {
  status: string;
};

const SidebarAddItem: React.FC<SidebarAddItemProps> = ({ status }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => {
    console.log(`Navigating to /add?status=${status.replace(/\s/g, "+")}`);
    navigate(`/add?status=${status.replace(/\s/g, "+")}`);
  };

  return (
    <Button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="opacity-50 hover:opacity-100"
    >
      Add Item {isHovered && `to ${status}`}
    </Button>
  );
};

export default SidebarAddItem;
