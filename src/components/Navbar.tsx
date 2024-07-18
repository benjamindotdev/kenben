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
    <nav className="w-[100%] h-[10vh] px-6 flex flex-row justify-between items-center opacity-50 hover:opacity-100 transition-all ease-in-out duration-1000">
      <h1 className="navbar__title">けんべん (kenben)</h1>
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
