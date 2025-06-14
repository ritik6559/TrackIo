'use client'

import React from 'react';
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useGetWorkspaceAnalytics} from "@/features/workspaces/api/use-get-workspace-analytics";
import {useGetTasks} from "@/features/tasks/api/use-get-tasks";
import {useGetProjects} from "@/features/projects/api/use-get-projects";
import {useGetMembers} from "@/features/members/api/use-get-members";
import {useCreateProjectModal} from "@/features/projects/hooks/use-create-project-modal";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";
import PageLoader from "@/components/page-loader";
import PageError from "@/components/page-error";
import Analytics from "@/components/analytics";
import {Task} from "@/features/tasks/types";
import {Button} from "@/components/ui/button";
import {CalendarIcon, Plus, SettingsIcon} from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import Link from "next/link";
import {Card, CardContent} from "@/components/ui/card";
import {formatDistanceToNow} from "date-fns";
import {Project} from "@/features/projects/types";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import {Member} from "@/features/members/types";
import MemberAvatar from "@/features/members/components/member-avatar";

const WorkspaceIdClient = () => {

    const workspaceId = useWorkspaceId();

    const { data: analytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics({ workspaceId });
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId });
    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

    const isLoading = isLoadingAnalytics ||
        isLoadingTasks ||
        isLoadingProjects ||
        isLoadingMembers;

    if (isLoading) {
        return <PageLoader />
    }

    if( !analytics || !tasks || !projects || !members) {
        return <PageError message={"Failed to load workspace data"} />
    }

    return (
        <div className={"h-full flex flex-col space-y-4"} >
            <Analytics
                data={analytics}
            />
            <div className={"grid grid-cols-1 xl:grid-cols-2 gap-4"} >
                <TaskList data={tasks.documents} total={tasks.total} />
                <ProjectList data={projects.documents} total={projects.total} />
                <MemberList data={members.documents} total={members.total}/>
            </div>
        </div>
    );
};

export default WorkspaceIdClient;

interface ProjectListProps {
    data: Project[];
    total: number;
}

export const ProjectList = ({data, total}: ProjectListProps) => {

    const { open: createProject } = useCreateProjectModal();
    const workspaceId = useWorkspaceId();

    return (
        <div className={"flex flex-col"} >
            <div className={"bg-white border rounded-lg p-4"} >
                <div className={"flex items-center justify-between"} >
                    <p className={"text-lg font-semibold"} >
                        Projects {total}
                    </p>
                    <Button variant={"secondary"} size={"icon"} onClick={createProject} >
                        <Plus className={"size-4 text-neutral-400 "} />
                    </Button>
                </div>
                <DottedSeparator className={"my-4"} />
                <ul className={"grid grid-cols-1 lg:grid-cols-2 gap-4"} >
                    {
                        data.map((project) => (
                            <li key={project.$id}>
                                <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                                    <Card className={"shadow-none rounded-lg hover:opacity-75 transition"} >
                                        <CardContent className={"p-4 flex items-center gap-x-2.5"} >
                                            <ProjectAvatar name={project.name} className={"size-12"} />
                                            <p className={"text-lg font-medium truncate"} >{project.name}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </li>
                        ))}
                    <li className={"text-sm text-muted-foreground text-center hidden first-of-type:block"} >
                        No Projects found
                    </li>
                </ul>
            </div>
        </div>
    )
}

interface TaskListProps {
    data: Task[];
    total: number;
}

export const TaskList = ({data, total}: TaskListProps) => {

    const { open: createTask } = useCreateTaskModal();
    const workspaceId = useWorkspaceId();

    return (
        <div className={"flex flex-col"} >
            <div className={"bg-muted rounded-lg p-4"} >
                <div className={"flex items-center justify-between"} >
                    <p className={"text-lg font-semibold"} >
                        Tasks {total}
                    </p>
                    <Button variant={"muted"} size={"icon"} onClick={createTask} >
                        <Plus className={"size-4 text-neutral-400 "} />
                    </Button>
                </div>
                <DottedSeparator className={"my-4"} />
                <ul className={"flex flex-col gap-y-4"} >
                    {
                        data.map((task) => (
                            <li key={task.$id}>
                                <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                                    <Card className={"shadow-none rounded-lg hover:opacity-75 transition"} >
                                        <CardContent className={"p-4"} >
                                            <p className={"text-lg font-medium truncate"} >
                                                {task.name}
                                            </p>
                                            <div className={"flex items-center gap-x-2"} >
                                                <p>
                                                    {task.project?.name}
                                                </p>
                                                <div className={"size-1 rounded-full bg-neutral-300"} />
                                                <div className={"text-sm text-muted-foreground flex items-center"} >
                                                    <CalendarIcon className={"size-3 mr-1"} />
                                                    <span className={"truncate"} >
                                                        {formatDistanceToNow(new Date(task.dueDate))}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </li>
                        ))}
                    <li className={"text-sm text-muted-foreground text-center hidden first-of-type:block"} >
                        No tasks found
                    </li>
                </ul>
                <Button variant={"muted"} className={"mt-4 w-full"} >
                    <Link href={`/workspaces/${workspaceId}/tasks`}>
                        Show All
                    </Link>
                </Button>
            </div>
        </div>
    )
}

interface MembersListProps {
    data:  Member[];
    total: number;
}

export const MemberList = ({data, total}: MembersListProps) => {

    const workspaceId = useWorkspaceId();

    return (
        <div className={"flex flex-col"} >
            <div className={"bg-white border rounded-lg p-4"} >
                <div className={"flex items-center justify-between"} >
                    <p className={"text-lg font-semibold"} >
                        Members {total}
                    </p>
                    <Button variant={"secondary"} size={"icon"} asChild>
                        <Link href={`/workspaces/${workspaceId}/members`}>
                            <SettingsIcon className={"size-4 text-neutral-400 "} />
                        </Link>
                    </Button>
                </div>
                <DottedSeparator className={"my-4"} />
                <ul className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"} >
                    {
                        data.map((member) => (
                            <li key={member.$id}>
                                <Card className={"shadow-none rounded-lg overflow-hidden"} >
                                    <CardContent className={"p-3 flex flex-col items-center gap-x-2"} >
                                        <MemberAvatar name={member.name} className={"size-12"} />
                                        <div className={"flex flex-col items-center overflow-hidden"} >
                                            <p className={"text-lg font-medium line-clamp-1"} >{member.name}</p>
                                            <p className={"text-sm text-muted-foreground line-clamp-1"} >{member.email}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </li>
                        ))}
                    <li className={"text-sm text-muted-foreground text-center hidden first-of-type:block"} >
                        No Members found
                    </li>
                </ul>
            </div>
        </div>
    )
}
