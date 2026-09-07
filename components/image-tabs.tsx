"use client"
import {useState} from "react";
import {Button} from "@/components/ui/button";
import Image from "next/image";
export default function ImageTabs(){
    const [activeTab, setActiveTab] = useState("organize");
    return (
        <>
            <section className="mt-12 border-b border-[#e7e6ef] py-16 sm:mt-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-5 flex flex-wrap justify-center gap-2 px-2">
                            <Button className={`h-auto rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab==="organize"?"bg-[#b7c179] text-white hover:bg-[#94a15a]":"border border-white/70 bg-white/55 text-[#70738a] hover:bg-white"}`} onClick = {()=>setActiveTab("organize")}>Organize Applications</Button>
                            <Button className={`h-auto rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab==="hired"?"bg-[#b7c179] text-white hover:bg-[#94a15a]":"border border-white/70 bg-white/55 text-[#70738a] hover:bg-white"}`} onClick = {()=>setActiveTab("hired")}>Get Hired</Button>
                            <Button className={`h-auto rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab==="boards"?"bg-[#b7c179] text-white hover:bg-[#94a15a]":"border border-white/70 bg-white/55 text-[#70738a] hover:bg-white"}`} onClick = {()=>setActiveTab("boards")}>Manage Boards</Button>
                        </div>
                        <p className="mb-7 text-center text-sm text-[#70738a]">{activeTab === "organize" ? "Every application lives on one board, sorted into the stages that matter to you." : activeTab === "hired" ? "Keep role details and the context you need close at hand." : "Set up boards that fit every job search."}</p>
                        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#e7e6ef] bg-white shadow-2xl shadow-[#1b1d29]/15">
                            {activeTab==="organize" && (<Image src="/hero-images/hero1.png" alt="Organize Applications" width="1200" height="800"/>)}
                            {activeTab==="hired" && (<Image src="/hero-images/hero2.png" alt="Get Hired" width="1200" height="800"/>)}
                            {activeTab==="boards" && (<Image src="/hero-images/hero3.png" alt="Manage Boards" width="1200" height="800"/>)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
