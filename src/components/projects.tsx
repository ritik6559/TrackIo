'use client';

import React from 'react';
import {RiAddCircleFill} from "react-icons/ri";
import {useGetProjects} from "@/features/projects/api/use-get-projects";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {useCreateProjectModal} from "@/features/projects/hooks/use-create-project-modal";
import ProjectAvatar from "@/features/projects/components/project-avatar";

const Projects = () => {

    const workspaceId = useWorkspaceId();

    const { data } = useGetProjects({workspaceId});

    const { open } = useCreateProjectModal();

    const pathName = usePathname();

    return (
        <div className={"flex flex-col gap-y-2"} >
            <div className={"flex items-center justify-between"} >
                <p className={"text-xs uppercase text-neutral-500"} >PROJECTS</p>
                <RiAddCircleFill onClick={open} className={"size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"} />
            </div>
            {
                data?.documents.map((project) => {
                    const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
                    const isActive = pathName === href;

                    return (
                        <Link
                            key={project.$id}
                            href={href}
                        >
                            <div
                                className={cn('flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 cursor-pointer text-neutral-500', isActive && "bg-white shadow-md hover:opacity-100 text-primary")}
                            >
                                <ProjectAvatar
                                    name={project.name}
                                    image={project.image}
                                />
                                <span className={"truncate"} >{project.name}</span>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default Projects;
