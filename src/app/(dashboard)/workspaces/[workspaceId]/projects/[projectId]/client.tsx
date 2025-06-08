'use client'

import React from 'react';
import ProjectAvatar from "@/features/projects/components/project-avatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PencilIcon} from "lucide-react";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import {useProjectId} from "@/features/projects/hooks/use-project-id";
import {useGetProject} from "@/features/projects/api/use-get-project";
import PageLoader from "@/components/page-loader";
import PageError from "@/components/page-error";
import {useGetProjectAnalytics} from "@/features/projects/api/use-get-project-analytics";
import Analytics from "@/components/analytics";

const ProjectIdClient = () => {

    const projectId = useProjectId();

    const { data: project, isLoading: isLoadingProject } = useGetProject({
        projectId: projectId,
    });

    const { data: analytics, isLoading: isLoadingAnalytics } = useGetProjectAnalytics({
        projectId: projectId,
    });

    if (isLoadingProject || isLoadingAnalytics) {
        return <PageLoader />
    }

    if (!project) {
        return <PageError message={"Project not found"} />
    }

    return (
        <div
            className={"flex flex-col gap-y-4"}
        >
            <div
                className={"flex items-center justify-between"}
            >
                <div
                    className={"flex items-center gap-x-2"}
                >
                    <ProjectAvatar
                        name={project.name!}
                        image={project.image!}
                    />
                    <p className={"text-lg font-semibold"} >{project.name}</p>
                </div>
                <div>
                    <Button
                        variant="secondary"
                        size="sm"
                        asChild
                    >
                        <Link href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}>
                            <PencilIcon />
                            Edit Project
                        </Link>
                    </Button>
                </div>
            </div>
            <Analytics data={analytics} />
            <TaskViewSwitcher hideProjectFilter={true} />
        </div>
    );
};

export default ProjectIdClient;
