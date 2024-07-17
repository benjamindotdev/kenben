import ReactLogo from "../assets/react.svg";
import TailwindLogo from "../assets/tailwind.svg";
import ShadCnLogo from "../assets/shadcn.png";

const NavbarLogos = () => {
  return (
    <div className="flex flex-row gap-6">
      <img src={ReactLogo} alt="React Logo" className="w-8 h-8" />
      <img src={TailwindLogo} alt="Tailwind Logo" className="w-8 h-8" />
      <img src={ShadCnLogo} alt="Shadcn Logo" className="w-8 h-8" />
    </div>
  );
};

export default NavbarLogos;
