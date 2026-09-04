"use client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormEvent, useState} from "react";
import {signUp} from "@/lib/auth/auth-client";
import {useRouter} from "next/navigation";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router=  useRouter();
    async function handleSubmit(e: FormEvent){
        e.preventDefault();
        setLoading(true);
        try{

            const result = await signUp.email({
                name,
                email,
                password,
            })
            if(result.error){
                setError(result.error.message ?? "Failed to Signup");
            } else{
                router.push("/dashboard");
            }
        }catch(err){
            setError("Unexpected Error Occured");
        }finally{
             setLoading(false);
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Create an account to start tracking your job application
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>

                    <CardContent className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-destructive/15  p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   id="name"
                                   type="text"
                                   placeholder="John Doe" required/>
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input value={email}
                                   onChange={(e)=> setEmail(e.target.value)}
                                   id="email"
                                   type="email"
                                   placeholder="johndoe@gmail.com" required/>
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input value={password}
                                   onChange={(e)=> setPassword(e.target.value)}
                                   id="password" minLength={8} type="password"
                                   placeholder="John Doe" required/>
                        </div>
                    </CardContent>
                    <CardFooter className="space-y-4 flex flex-col mt-4">
                        <Button disabled={loading} type="submit" className="w-full  bg-primary hover:bg-primary/90">
                            {loading?"Creating Account...":"Sign Up"}
                        </Button>
                        <p> Already Registered ? <Link className="font-medium text-primary hover:underline"
                                                       href="/sign-in">Log In</Link></p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}