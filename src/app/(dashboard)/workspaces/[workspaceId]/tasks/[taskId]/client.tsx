'use client'

import {useTaskId} from "@/features/tasks/hooks/use-task-id";
import {useGetTask} from "@/features/tasks/api/use-get-task";
import PageLoader from "@/components/page-loader";
import PageError from "@/components/page-error";
import TaskBreadCrumbs from "@/features/tasks/components/task-bread-crumbs";
import DottedSeparator from "@/components/dotted-separator";
import TaskOverview from "@/features/tasks/components/task-overview";
import TaskDescription from "@/features/tasks/components/task-description";
import {Task} from "@/features/tasks/types";

export const TaskIdClient = () => {

    const taskId = useTaskId();
    const { data, isLoading } = useGetTask({
        taskId: taskId,
    });

    if( isLoading ) {
        return (
            <PageLoader />
        )
    }

    if(!data){
        return <PageError message={"Task not found"} />
    }


    return (
        <div className={"flex flex-col"} >

            <TaskBreadCrumbs project={data.project} task={data as unknown as Task} />
            <DottedSeparator className={"my-6"} />
            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"} >
                <TaskOverview task={data as unknown as Task} />
                <TaskDescription task={data as unknown as Task} />
            </div>
        </div>
    )
}
