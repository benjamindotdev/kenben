import NavbarLogos from "./NavbarLogos";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import benjamin from "../assets/benjamin.jpeg";
import benjaminGrey from "../assets/benjaminGrey.jpg";
import SocialIcons from "./SocialIcons";

const Navbar = () => {
  return (
    <nav className="w-[100%] h-[10vh] px-6 flex flex-row justify-between items-center opacity-50 hover:opacity-100 transition-all ease-in-out duration-1000">
      <h1 className="navbar__title">けんべん (kenben)</h1>

      <Sheet>
        <SheetTrigger>About</SheetTrigger>
        <SheetContent side={"top"} className="h-[50vw] bg-slate-900 pt-8">
          <SheetHeader className="h-full">
            <SheetTitle>
              <h1 className="navbar__title">けんべん (kenben)</h1>
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-8 h-[100%]">
              <h2>A kanban board built by someone named Ben.</h2>
              <div className="flex flex-row p-6 justify-start items-center gap-4">
                <p>Built by:</p>
                <HoverCard>
                  <HoverCardTrigger>
                    <Avatar className="animate-pulse">
                      <AvatarImage src={benjaminGrey} alt="benjamin" />
                      <AvatarFallback>BM</AvatarFallback>
                    </Avatar>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-full ml-6 mt-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row justify-start gap-6 items-center px-2">
                        <Avatar>
                          <AvatarImage src={benjamin} alt="benjamin" />
                          <AvatarFallback>BM</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-primary font-bold text-xl">
                            Benjamin
                          </h3>
                          <p>React Developer</p>
                        </div>
                      </div>

                      <SocialIcons />
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <p>with:</p>
                <NavbarLogos />
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
