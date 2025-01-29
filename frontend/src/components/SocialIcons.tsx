import { Github, Linkedin, BriefcaseBusiness, Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const socials = [
  {
    href: "https://github.com/benjamindotdev",
    icon: <Github />,
    label: "Github",
  },
  {
    href: "https://www.linkedin.com/in/benjamindotdev/",
    icon: <Linkedin />,
    label: "LinkedIn",
  },
  {
    href: "https://benjamin.dev",
    icon: <BriefcaseBusiness />,
    label: "Portfolio",
  },
  {
    href: "mailto:hello@benjamin.dev",
    icon: <Mail />,
    label: "Email",
  },
];

const SocialIcons = () => {
  return (
    <div className="flex flex-row gap-4">
      {socials.map((social, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row gap-2 text-white hover:text-primary"
              >
                {social.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-800">
              {social.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default SocialIcons;
