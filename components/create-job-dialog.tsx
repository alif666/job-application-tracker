"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import {createJobApplication} from "@/lib/actions/job-application";


interface CreateJobApplicationDialogProps{
    columnId: string;
    boardId: string;
}``
const INITIAL_FORM_DATA = {
    company: "",
    position: "",
    location: "",
    notes: "",
    salary: "",
    jobUrl: "",
    tags: "",
    description: "",
}
export default function CreateJobApplicationDialog({columnId, boardId}: CreateJobApplicationDialogProps){

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);


    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try{
            const result = await createJobApplication({
                ...formData,
                columnId,
                boardId,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0),
            });

            if(!result.error){
                setFormData(INITIAL_FORM_DATA);
                setOpen(false);
            }else{
                console.error("Failed to create job: ", result.error)
            }

        }catch(err){
            console.error(err);
        }
    }
    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="outline"/>}>
                <Plus/>
                Add Job
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Job Application</DialogTitle>
                    <DialogDescription>
                        Track a new job application
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="company"> Company *</Label>
                                <Input onChange={(e)=>setFormData({...formData, company: e.target.value})}
                                       value={formData.company}
                                       id="company" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position"> Position *</Label>
                                <Input onChange={(e)=>setFormData({...formData, position: e.target.value})}
                                       value={formData.position}
                                       id="position" required/>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="location"> Location</Label>
                                <Input onChange={(e)=>setFormData({...formData, location: e.target.value})}
                                       value={formData.location}
                                       id="location" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary"> Salary</Label>
                                <Input onChange={(e)=>setFormData({...formData, salary: e.target.value})}
                                       value={formData.salary}
                                       id="salary"
                                       placeholder="e.g., $100k-$150k" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobUrl"> Job URL</Label>
                            <Input onChange={(e)=>setFormData({...formData, jobUrl: e.target.value})}
                                   value={formData.jobUrl}
                                   id="jobUrl"
                                   placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags"> Tags (comma-separated)</Label>
                            <Input onChange={(e)=>setFormData({...formData, tags: e.target.value})}
                                   value={formData.tags}
                                   id="tags" placeholder="React,TailwindCSS" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description"> Description</Label>
                            <Textarea onChange={(e)=>setFormData({...formData, description: e.target.value})}
                                      value={formData.description}
                                      rows={3}
                                      id="description"
                                      placeholder="Brief Description of the role..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="notes"> Notes</Label>
                            <Textarea onChange={(e)=>setFormData({...formData, notes: e.target.value})}
                                      value={formData.notes}
                                      rows={3}
                                      id="notes" />
                        </div>
                    </div>
                    <DialogFooter className="flex flex-row justify-end">
                        <Button onClick={()=>setOpen(false)} type="button" variant="outline">Cancel</Button>
                        <Button type="submit">Add Application</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}