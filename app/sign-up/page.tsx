"use client"
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
        }catch{
            setError("Unexpected Error Occured");
        }finally{
             setLoading(false);
        }
    }

    return (
        <main className="auth-page">
          <div className="auth-stage">
            <div className="auth-card">
              <aside className="auth-aside">
                <div>
                  <span className="auth-kicker">Free while you job hunt</span>
                  <h1>Keep every application in one place</h1>
                  <p>Track statuses, interview dates and follow-ups without losing the thread.</p>
                  <div className="auth-tracker">
                    <div className="auth-tracker-row"><i className="auth-dot bg-[#7CF2B0]"/><b>Stripe</b><span>Interview</span></div>
                    <div className="auth-tracker-row"><i className="auth-dot bg-[#FFD666]"/><b>Figma</b><span>Under review</span></div>
                    <div className="auth-tracker-row"><i className="auth-dot bg-white/50"/><b>Notion</b><span>Applied</span></div>
                  </div>
                </div>
                <p>Already tracking applications? <Link className="font-semibold text-white underline-offset-4 hover:underline" href="/sign-in">Log in</Link></p>
              </aside>
              <section className="auth-form">
                <h2>Create your account</h2>
                <p className="auth-subtitle">Set up in under a minute — no credit card needed.</p>
                <form onSubmit={handleSubmit}>

                    <div className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-destructive/15  p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}
                        <div className="auth-field">
                            <Label htmlFor="name">Name</Label>
                            <Input value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   id="name"
                                   type="text"
                                   className="auth-input" placeholder="Jordan Blake" required/>
                        </div>
                        <div className="auth-field">
                            <Label htmlFor="email">Email</Label>
                            <Input value={email}
                                   onChange={(e)=> setEmail(e.target.value)}
                                   id="email"
                                   type="email"
                                   className="auth-input" placeholder="jordan@email.com" required/>
                        </div>
                        <div className="auth-field">
                            <Label htmlFor="password">Password</Label>
                            <Input value={password}
                                   onChange={(e)=> setPassword(e.target.value)}
                                   id="password" minLength={8} type="password"
                                   className="auth-input" placeholder="At least 8 characters" required/>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button disabled={loading} type="submit" className="auth-submit">
                            {loading?"Creating Account...":"Sign Up"}
                        </Button>
                        <p className="auth-switch">Already registered? <Link href="/sign-in">Log in</Link></p>
                    </div>
                </form>
              </section>
            </div>
          </div>
        </main>
    )
}
