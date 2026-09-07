"use client";
import {Briefcase} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import SignOutBtn from "@/components/sign-out-btn";
import {useSession} from "@/lib/auth/auth-client";


export default function Navbar(){
    const {data: session} = useSession();
    return(
        <nav className="sticky top-0 z-50 border-b border-white/60 bg-white/60 backdrop-blur-xl">
            <div className="container mx-auto flex h-[4.5rem] items-center justify-between px-5 sm:px-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-[#1b1d29]">
                    <Briefcase className="size-5 text-[#b7c179]"/>
                    Job Tracker
                </Link>
                <div className="flex items-center gap-2 sm:gap-5">
                    {session?.user ?
                        <>
                            <Link href="/dashboard">
                                <Button variant ="ghost" className="font-semibold text-[#1b1d29] hover:bg-[#f3f5e7] hover:text-[#7c8940]">
                                    Dashboard
                                </Button>
                            </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="bg-primary text-white">
                                                    {session.user.name[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent  className="w-56" align="end">
                                        <DropdownMenuGroup className="font-normal">
                                            <DropdownMenuLabel>
                                                <div className="flex flex-col spacy-y-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {session.user.name}
                                                    </p>
                                                    <p className="text-xs leading-none text-muted-foreground">
                                                        {session.user.email}
                                                    </p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <SignOutBtn/>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                        </>
                        :
                        <>
                            <Link href="sign-in">
                                <Button variant="ghost" className="font-semibold text-[#1b1d29] hover:bg-[#f3f5e7] hover:text-[#7c8940]">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button className="h-auto rounded-lg bg-[#b7c179] px-4 py-2 font-bold text-white hover:bg-[#94a15a]">
                                    Start for Free
                                </Button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </nav>
    )
}
