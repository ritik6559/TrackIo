import React from 'react';
import {Task} from "@/features/tasks/types";
import {PencilIcon} from "lucide-react";
import {Button} from '@/components/ui/button'
import DottedSeparator from "@/components/dotted-separator";
import OverviewProperty from "@/features/tasks/components/overview-property";
import MemberAvatar from "@/features/members/components/member-avatar";
import {TaskDate} from "@/features/tasks/components/task-date";
import {Badge} from "@/components/ui/badge";
import {snakeCaseToTitleCase} from "@/lib/utils";
import {useUpdateTaskModal} from '@/features/tasks/hooks/use-update-task-modal'

interface TaskOverviewProps {
    task: Task
}

const TaskOverview = ({
    task
}: TaskOverviewProps) => {

    const {open} = useUpdateTaskModal();

    return (
        <div className={"flex flex-col gap-y-4 col-span-1"} >
            <div className={"bg-muted rounded-lg p-4"} >
                <div className={"flex items-center justify-between"} >
                    <p className={"text-lg font-semibold"} >Overview</p>
                    <Button
                        size={"sm"}
                        variant={"secondary"}
                        onClick={() => open(task.$id)}
                    >
                        <PencilIcon className={"size-4 mr-2"} />
                        Edit
                    </Button>
                </div>
                <DottedSeparator className={"my-4"} />
                <div className={"flex flex-col gap-y-4"} >
                    <OverviewProperty label={"Assignee"} >
                        <MemberAvatar name={task.assignee.name} />
                        <p className={"text-sm font-medium"} >{task.assignee.name}</p>
                    </OverviewProperty>
                    <OverviewProperty label={"Due Date"} >
                        <TaskDate value={task.dueDate} className={"text-sm font-medium"} />
                    </OverviewProperty>
                    <OverviewProperty label={"Status"} >
                        <Badge
                            variant={task.status}
                        >
                            {snakeCaseToTitleCase(task.status)}
                        </Badge>
                    </OverviewProperty>
                </div>
            </div>
        </div>
    );
};

export default TaskOverview;
