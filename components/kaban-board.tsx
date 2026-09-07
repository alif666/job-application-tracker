"use client"
import {Board, Column, JobApplication} from "@/lib/models/models.types";
import {Award, Calendar, CheckCircle2, Mic, MoreHorizontal, MoreVertical, Trash2, XCircle} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "@/components/create-job-dialog";
import JobApplicationCard from "@/components/job-application-card";
import {useBoard} from "@/lib/hooks/useBoards";

interface KanbanBoardProps {
    board: Board;
    userId: string;
}

interface ColConfig {
    color: string;
    icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColConfig> = [
    {
        color: "bg-cyan-500",
        icon: <Calendar className="h-4 w-4"/>,
    },
    {
        color: "bg-purple-500",
        icon: <CheckCircle2 className="h-4 w-4"/>,
    },
    {
        color: "bg-green-500",
        icon: <Mic className="h-4 w-4"/>,
    },
    {
        color: "bg-yellow-500",
        icon: <Award className="h-4 w-4"/>,
    },
    {
        color: "bg-red-500",
        icon: <XCircle className="h-4 w-4"/>,
    },
];

function DroppableColumn({column, config, boardId, sortedColumns}: { column: Column; config: ColConfig; boardId: string, sortedColumns: Column[] }) {
    const sortedJobs = column.jobApplications.sort((a,b)=>a.order-b.order) || [];
    return(
        <Card className="min-w-[300px] flex-shrink-0 shadow-md p-0">
            <CardHeader
                className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {config.icon}
                        <CardTitle className="text-white text-base font-semibold">
                            {column.name}
                        </CardTitle>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex size-7 items-center justify-center rounded-md border-0 bg-transparent text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:bg-white/30">
                                <MoreVertical className="h-4 w-4"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Column
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="space-y-2 pt-4 bg-gray-50/50 min-h-[400px] rounded-b-lg">
                {sortedJobs.map((job,key)=>(
                    <SortableJobCard key ={key} job ={{...job,columnId: job._id || column._id}} columns={sortedColumns}/>
                ))}
                <CreateJobApplicationDialog columnId={column._id} boardId={boardId}/>
            </CardContent>
        </Card>
    );
}


function SortableJobCard({job,columns}: {job: JobApplication; columns: Column[]}){
    return(
        <div>
            <JobApplicationCard job={job} columns={columns}/>
        </div>
    );
}
export default function KanbanBoard({board, userId}: KanbanBoardProps) {
    const {columns, moveJob} = useBoard(board);
    const sortedColumns = columns?.sort((a,b)=>a.order-b.order) || [];

    // console.log(columns[0].jobApplications);
    return (
        <>
            <div>
                <div>
                    {columns.map((col, key) => {
                        const config = COLUMN_CONFIG[key] || {
                            color: "bg-gray-500",
                            icon: <Calendar className="h-4 w-4"/>
                        };
                        return <DroppableColumn key={key} column={col} config={config}
                                                boardId={board._id} sortedColumns={sortedColumns}></DroppableColumn>;
                    })}
                </div>
            </div>


        </>
    )

}
