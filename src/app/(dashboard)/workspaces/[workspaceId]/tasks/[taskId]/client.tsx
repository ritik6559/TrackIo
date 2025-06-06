'use client'

import {useTaskId} from "@/features/tasks/hooks/use-task-id";
import {useGetTask} from "@/features/tasks/api/use-get-task";
import PageLoader from "@/components/page-loader";
import PageError from "@/components/page-error";
import TaskBreadCrumbs from "@/features/tasks/components/task-bread-crumbs";

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
            <TaskBreadCrumbs project={data.project} task={data} />
        </div>
    )
}
