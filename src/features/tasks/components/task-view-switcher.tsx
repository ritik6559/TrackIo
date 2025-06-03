'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Loader, PlusIcon} from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";
import {useQueryState} from "nuqs";
import {useGetTasks} from "@/features/tasks/api/use-get-tasks";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import DataFilters from "@/features/tasks/components/data-filters";
import {useTaskFilters} from "@/features/tasks/hooks/use-task-filters";
import {DataTable} from "@/features/tasks/components/data-table";
import {columns} from "@/features/tasks/components/columns";

const TaskViewSwitcher = () => {

    const [ view, setView ] = useQueryState("task-view", {
        defaultValue: 'table'
    });

    const workspaceId = useWorkspaceId();

    const [{
        status,
        assigneeId,
        projectId,
        dueDate
    }] = useTaskFilters();

    const {
        data: tasks,
        isLoading: isLoadingTasks
    } = useGetTasks({
        workspaceId,
        projectId,
        assigneeId,
        status,
        dueDate
    });

    const { open  } = useCreateTaskModal();



    return (
        <Tabs
            defaultValue={view}
            onValueChange={setView}
            className={"flex-1 w-full border rounded-lg"}
        >
            <div
                className={"h-full flex flex-col overflow-auto p-4"}
            >
                <div
                    className={"flex flex-col gap-y-2 lg:flex-row justify-between items-center"}
                >
                    <TabsList
                        className={"w-full lg:w-auto"}
                    >
                        <TabsTrigger
                            value={'table'}
                            className={"h-8 w-full lg:w-auto"}
                        >
                            Table
                        </TabsTrigger>
                        <TabsTrigger
                            value={'kanban'}
                            className={"h-8 w-full lg:w-auto"}
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            value={'calendar'}
                            className={"h-8 w-full lg:w-auto"}
                        >
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        size={"sm"}
                        className={"w-full lg:w-auto"}
                        onClick={open}
                    >
                        <PlusIcon
                            className={"size=4 mr-2"}
                        />
                        New Task
                    </Button>
                </div>
                <DottedSeparator className={"my-4"} />
                <DataFilters />
                <DottedSeparator className={"my-4"} />
                {
                    isLoadingTasks ? (
                        <div
                            className={"w-full border rounded-lg h-[200px] flex flex-col items-center justify-center"}
                        >
                            <Loader className={"animate-spin text-muted-foreground"} />
                        </div>
                    ) :

                    <>
                        <TabsContent
                            className={"mt-8"}
                            value={'table'}
                        >
                            <DataTable columns={columns} data={tasks!.documents ?? []} />
                        </TabsContent>
                        <TabsContent
                            className={"mt-8"}
                            value={'kanban'}
                        >
                            Data Kanban
                        </TabsContent>
                        <TabsContent
                            className={"mt-8"}
                            value={'calendar'}
                        >
                            Data calendar
                        </TabsContent>
                    </>
                }
            </div>
        </Tabs>
    )
}


export default TaskViewSwitcher;
