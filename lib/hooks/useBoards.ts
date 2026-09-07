"use client";
import {Board, Column, JobApplication} from "@/lib/models/models.types";
import {useEffect, useState} from "react";
import {updateJobApplication} from "@/lib/actions/job-application";



export function useBoard(initialBoard?:Board  | null){
    const [board, setBoard] = useState<Board | null>(initialBoard || null);
    const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialBoard) {
            setBoard(initialBoard);
            setColumns(initialBoard.columns || []);
        }
    }, [initialBoard]);
    async function moveJob(
        jobApplicationId: string,
        newColumnId: string,
        newOrder: number
    ) {
        setColumns((prev) => {
            const newColumns = prev.map((col) => ({
                ...col,
                jobApplications: [...col.jobApplications],
            }));

            let jobToMove: JobApplication | null = null;
            let oldColumnId: string | null = null;

            for (const col of newColumns) {
                const jobIndex = col.jobApplications.findIndex(
                    (job) => job._id === jobApplicationId
                );

                if (jobIndex !== -1) {
                    jobToMove = col.jobApplications[jobIndex];
                    oldColumnId = col._id;
                    col.jobApplications = col.jobApplications.filter(
                        (job) => job._id !== jobApplicationId
                    );
                    break;
                }
            }

            if (jobToMove && oldColumnId) {
                const targetColumnIndex = newColumns.findIndex(
                    (col) => col._id === newColumnId
                );

                if (targetColumnIndex !== -1) {
                    const targetColumn = newColumns[targetColumnIndex];
                    const updatedJobs = [...(targetColumn.jobApplications || [])];

                    updatedJobs.splice(newOrder, 0, {
                        ...jobToMove,
                        columnId: newColumnId,
                        order: newOrder * 100,
                    });

                    newColumns[targetColumnIndex] = {
                        ...targetColumn,
                        jobApplications: updatedJobs.map((job, index) => ({
                            ...job,
                            order: index * 100,
                        })),
                    };
                }
            }

            return newColumns;
        });

        try {
            await updateJobApplication(jobApplicationId, {
                columnId: newColumnId,
                order: newOrder,
            });
        } catch (err) {
            console.error("Error moving job:", err);
        }

    }
    return {board, columns, error, moveJob};
}
