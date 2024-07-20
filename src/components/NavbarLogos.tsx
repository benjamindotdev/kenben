import ReactLogo from "../assets/react.svg";
import TailwindLogo from "../assets/tailwind.svg";
import ShadCnLogo from "../assets/shadcn.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const avatars = [
  {
    src: ReactLogo,
    alt: "React Logo",
  },
  {
    src: TailwindLogo,
    alt: "Tailwind Logo",
  },
  {
    src: ShadCnLogo,
    alt: "Shadcn Logo",
  },
];

const NavbarLogos = () => {
  return (
    <ul className="flex flex-row gap-4 animate-pulse">
      {avatars.map((avatar, index) => (
        <Avatar key={index}>
          <AvatarImage src={avatar.src} alt={avatar.alt} className="w-8 h-8" />
          <AvatarFallback>{avatar.alt}</AvatarFallback>
        </Avatar>
      ))}
    </ul>
  );
};

export default NavbarLogos;
