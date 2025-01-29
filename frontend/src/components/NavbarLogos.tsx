import ReactLogo from "../assets/react.svg";
import TailwindLogo from "../assets/tailwind.svg";
import ShadCnLogo from "../assets/shadcn.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const avatars = [
  {
    src: ReactLogo,
    alt: "React",
    website: "https://reactjs.org/",
    description: "The library for web and native user interfaces",
  },
  {
    src: TailwindLogo,
    alt: "Tailwind CSS",
    website: "https://tailwindcss.com/",
    description:
      "Rapidly build modern websites without ever leaving your HTML.",
  },
  {
    src: ShadCnLogo,
    alt: "shadcn",
    website: "https://shadcn.com/",
    description:
      "Beautifully designed components that you can copy and paste into your apps.",
  },
];

const NavbarLogos = () => {
  return (
    <div className="flex flex-row gap-4 animate-pulse">
      {avatars.map((avatar, index) => (
        <HoverCard key={index}>
          <HoverCardTrigger>
            <Avatar>
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>{avatar.alt}</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="w-full ml-6 mt-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-start gap-6 items-center px-2">
                <Avatar>
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                  <AvatarFallback>{avatar.alt}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h3 className="text-primary font-bold text-xl">
                    {avatar.alt}
                  </h3>
                  <a
                    className="text-white hover:text-primary"
                    href={avatar.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {avatar.website}
                  </a>
                  <p>{avatar.description}</p>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default NavbarLogos;
