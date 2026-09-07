"use client";
import { Label } from "@/components/ui/label";
import {signIn} from "@/lib/auth/auth-client";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    async function handleSubmit(e:FormEvent){
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signIn.email({
                email,
                password
            });
            if(result.error){
                setError(result.error.message??"Failed to SignIn");
            }else {
                router.push("/dashboard");
            }
        }catch{
            setError("Unexpected Error Occured");
        }finally{
            setLoading(false);
        }
    }

    return(
        <main className="auth-page">
          <div className="auth-stage">
            <div className="auth-card">
              <aside className="auth-aside">
                <div>
                  <span className="auth-kicker">Your job search, organized</span>
                  <h1>Good to see you again</h1>
                  <p>Pick up right where you left off with your saved applications.</p>
                  <div className="auth-tracker">
                    <div className="auth-tracker-row"><i className="auth-dot bg-[#7CF2B0]"/><b>Stripe</b><span>Interview</span></div>
                    <div className="auth-tracker-row"><i className="auth-dot bg-[#FFD666]"/><b>Figma</b><span>Under review</span></div>
                    <div className="auth-tracker-row"><i className="auth-dot bg-white/50"/><b>Notion</b><span>Applied</span></div>
                  </div>
                </div>
                <p>New to Job Tracker? <Link className="font-semibold text-white underline-offset-4 hover:underline" href="/sign-up">Create an account</Link></p>
              </aside>
              <section className="auth-form">
                <h2>Welcome back</h2>
                <p className="auth-subtitle">Log in to see where every application stands.</p>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-destructive/15  p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}
                        <div className="auth-field">
                            <Label htmlFor="email">Email</Label>
                            <Input value = {email}
                                   onChange = {(e)=> setEmail(e.target.value)}
                                   id = "email"
                                   type = "email"
                                   className="auth-input" placeholder="jordan@email.com" required/>
                        </div>
                        <div className="auth-field">
                            <Label htmlFor="password">Password</Label>
                            <Input value = {password}
                                   onChange={(e)=>setPassword(e.target.value)}
                                   id = "password"
                                   minLength={8}
                                   type = "password"
                                   className="auth-input" placeholder="Your password" required/>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button disabled={loading}
                                type="submit"
                                className="auth-submit">{loading?"Signing In...":"Log In"} </Button>
                        <p className="auth-switch">New here? <Link href="/sign-up">Create an account</Link></p>
                    </div>
                </form>
              </section>
            </div>
          </div>
        </main>
    )
}
