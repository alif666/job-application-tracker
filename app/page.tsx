import {Button} from "@/components/ui/button"
import {ArrowRight, Briefcase, CheckCircle2, TrendingUp} from "lucide-react";
import Link from "next/link";
import ImageTabs from "@/components/image-tabs";

export default function Home() {


  return (
    <div className="site-shell flex min-h-screen flex-col">
      <main className="flex-1">
      {/*  Hero Section */}
        <section className="container mx-auto px-6 pb-10 pt-20 sm:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-3.5 py-1.5 text-xs font-semibold text-[#7c8940] shadow-sm backdrop-blur"><i className="size-1.5 rounded-full bg-[#b7c179]"/>Built for the modern job search</span>
            <h1 className="marketing-heading mt-6 mb-5 text-4xl font-bold leading-[1.12] sm:text-6xl">
              A better way to track your job application
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-[#70738a] sm:text-lg">Capture, organize and manage your job search in one place — from the first application to a signed offer, without a messy spreadsheet.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Link href="/sign-up">
              <Button size="lg" className="h-auto rounded-xl bg-[#b7c179] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-[#7c8940]/15 hover:bg-[#94a15a]">
                Start for free
                <ArrowRight className="ml-2"/>
              </Button>
            </Link>
            <a className="text-sm font-semibold text-[#1b1d29] hover:text-[#7c8940]" href="#preview">See how it works</a>
            <p className="mt-2 text-sm text-[#70738a]">Free forever. No credit card required.</p>
            <p className="italic text-xs text-[#9c9fb2]">For demo use aliflodithree@gmail.com / aliflodi</p>
          </div>
        </section>
        <section className="container mx-auto grid max-w-4xl grid-cols-2 gap-3 px-6 pb-8 text-center sm:grid-cols-4 sm:gap-5">
          {[["5", "Pipeline stages"], ["∞", "Boards you can run"], ["0s", "Setup time"], ["$0", "Cost to start"]].map(([number, label]) => <div key={label} className="rounded-2xl border border-white/70 bg-white/50 px-3 py-4 shadow-sm backdrop-blur"><strong className="block text-2xl font-bold tracking-tight">{number}</strong><span className="mt-1 block text-xs text-[#70738a]">{label}</span></div>)}
        </section>
      {/* Hero Images Section with Tabs */}
        <div id="preview" className="scroll-mt-20"><ImageTabs/></div>

        {/* Features Section */}
        <section className="border-t border-[#e7e6ef] bg-gradient-to-b from-[#f6f7ef] to-[#eff1e3] py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center"><h2 className="marketing-heading text-3xl font-bold">Everything in its place</h2><p className="mt-3 text-sm text-[#70738a]">A calm workspace for every stage of the job search.</p></div>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="flex flex-col rounded-2xl border border-white/70 bg-white/60 p-6 shadow-sm backdrop-blur">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#7c8940]">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold">
                  Organize Applications
                </h3>
                <p className="text-sm leading-6 text-[#70738a]">
                  Create custom boards and columns to track your job
                  applications at every stage of the process.
                </p>
              </div>
              <div className="flex flex-col rounded-2xl border border-white/70 bg-white/60 p-6 shadow-sm backdrop-blur">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#7c8940]">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold">
                  Track Progress
                </h3>
                <p className="text-sm leading-6 text-[#70738a]">
                  Monitor your application status from applied to interview to
                  offer with visual Kanban boards.
                </p>
              </div>
              <div className="flex flex-col rounded-2xl border border-white/70 bg-white/60 p-6 shadow-sm backdrop-blur">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#7c8940]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold">
                  Stay Organized
                </h3>
                <p className="text-sm leading-6 text-[#70738a]">
                  Never lose track of an application. Keep all your job search
                  information in one centralized place.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto max-w-5xl px-6 py-20 text-center"><div className="rounded-3xl bg-gradient-to-br from-[#b7c179] to-[#94a15a] px-6 py-14 text-white shadow-xl sm:px-12"><h2 className="marketing-heading text-3xl font-bold">Your next offer starts with one board</h2><p className="mt-3 text-sm text-white/85">Set it up in under a minute, no credit card required.</p><Link href="/sign-up" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#7c8940] hover:bg-[#f5f6ef]">Start for free <ArrowRight className="size-4" /></Link></div></section>
      </main>
    </div>
  );
}
