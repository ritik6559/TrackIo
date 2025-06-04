'use client'

import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ExternalLinkIcon, PencilIcon, TrashIcon} from "lucide-react";
import useConfirm from "@/app/hooks/use-confirm";
import {useDeleteTask} from "@/features/tasks/api/use-delete-task";
import {useRouter} from "next/navigation";

interface TaskActionsProps {
    id: string;
    projectId: string;
    children: React.ReactNode;
}

const TaskActions = ({ id, projectId, children }: TaskActionsProps ) => {

    const [ ConfirmDialog, confirm ] = useConfirm(
        "Delete task",
        "This action cannot be undone"
    );

    const router = useRouter();

    const { mutateAsync: deleteTask, isPending } = useDeleteTask();

    const onDelete = async () => {
        const ok = await confirm();

        if(!ok){
            return;
        }

        console.log(id)

        await deleteTask({
            param: {
                taskId: id
            }
        });

        router.refresh()

    }


    return (
        <div className={"fle justify-end"} >
            <ConfirmDialog />
            <DropdownMenu modal={false} >
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align={"end"} className={"w-48"} >
                    <DropdownMenuItem
                        onClick={() => {}}
                        disabled={false}
                        className={"font-medium p-[10px]"}
                    >
                        <ExternalLinkIcon className={"size-4 mr-2 stroke-2"} />
                        Task Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {}}
                        disabled={false}
                        className={"font-medium p-[10px]"}
                    >
                        <PencilIcon className={"size-4 mr-2 stroke-2"} />
                        Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ExternalLinkIcon className={"size-4 mr-2 stroke-2"} />
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onDelete}
                        disabled={isPending}
                        className={"text-amber-700 focus:text-amber-700 font-medium p-[10px]"}
                    >
                        <TrashIcon className={"size-4 mr-2 stroke-2"} />
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default TaskActions;
