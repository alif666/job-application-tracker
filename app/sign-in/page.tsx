"use client"


import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function SignIn(){
    return(
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                </CardHeader>
                <form>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id = "email" type = "email" placeholder="johndoe@gmail.com" required/>
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id = "password" minLength={8} type = "password" placeholder="John Doe" required/>
                        </div>
                    </CardContent>
                    <CardFooter className="space-y-4 flex flex-col mt-4">
                        <Button type="submit" className="w-full  bg-primary hover:bg-primary/90">Sign In </Button>
                        <p> New User ? <Link className="font-medium text-primary hover:underline" href="/sign-up">Register</Link></p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}