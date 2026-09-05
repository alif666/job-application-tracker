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
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center px-4 justify-between">
                <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary space-x-4">
                    <Briefcase/>
                    Job Tracker
                </Link>
                <div className="flex items-center gap-4">
                    {session?.user ?
                        <>
                            <Link href="/dashboard">
                                <Button variant ="ghost" className="text-gray-700 hover:text-black">
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
                                <Button variant="ghost" className="text-gray-700 hover:text-black">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button>
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
