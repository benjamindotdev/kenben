import NavbarLogos from "./NavbarLogos";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="w-full h-[10vh] px-6 flex flex-row justify-between items-center">
      <h1>KENBEN</h1>
      <NavbarLogos />
      <NavigationMenu>
        <NavigationMenuList className="flex flex-row gap-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>About</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
