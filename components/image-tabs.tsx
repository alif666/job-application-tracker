"use client"
import {useState} from "react";
import {Button} from "@/components/ui/button";
import Image from "next/image";
export default function ImageTabs(){
    const [activeTab, setActiveTab] = useState("organize");
    return (
        <>
            <section className="py-16 border-b bg-white">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex gap-2 justify-center mb-8">
                            <Button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab==="organize"?"bg-primary text-white":"bg-secondary text-gray-700 hover:bg-gray-200"}`} onClick = {()=>setActiveTab("organize")}>Organize Applications</Button>
                            <Button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab==="hired"?"bg-primary text-white":"bg-secondary text-gray-700 hover:bg-gray-200"}`} onClick = {()=>setActiveTab("hired")}>Get Hired</Button>
                            <Button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab==="boards"?"bg-primary text-white":"bg-secondary text-gray-700 hover:bg-gray-200"}`} onClick = {()=>setActiveTab("boards")}>Manage Boards</Button>
                        </div>
                        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
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