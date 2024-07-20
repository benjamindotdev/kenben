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
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import benjamin from "../assets/benjamin.jpeg";
import { Github, Linkedin, BriefcaseBusiness, Mail } from "lucide-react";

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
                      <AvatarImage src={benjamin} alt="benjamin" />
                      <AvatarFallback>BM</AvatarFallback>
                    </Avatar>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="flex flex-col gap-4">
                      <h3>Benjamin</h3>
                      <p>Web Developer</p>
                      <div className="flex flex-row gap-4">
                        <a
                          href="https://github.com/benjamindotdev"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <Github />
                          <label className="sr-only">Github</label>
                        </a>
                        <a
                          href="https://www.linkedin.com/in/benjamindotdev/"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <Linkedin />
                          <label className="sr-only">LinkedIn</label>
                        </a>
                        <a
                          href="https://benjamin.dev"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <BriefcaseBusiness />
                          <label className="sr-only">Portfolio</label>
                        </a>
                        <a
                          href="mailto:hello@benjamin.dev"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <Mail />
                          <label className="sr-only">Email</label>
                        </a>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <p>with:</p>
                <NavbarLogos />
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
