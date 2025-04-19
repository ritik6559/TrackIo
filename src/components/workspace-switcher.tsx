"use client"

import React from 'react';
import {useGetWorkspaces} from "@/features/workspaces/api/use-get-workspaces";
import {RiAddCircleFill} from "react-icons/ri";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import {SelectIcon} from "@radix-ui/react-select";
import WorkspaceAvatar from "@/features/workspaces/components/workspace-avatar";
import workspaceAvatar from "@/features/workspaces/components/workspace-avatar";

const WorkspaceSwitcher = () => {

    const { data: workspaces } = useGetWorkspaces();

    return (
        <div className={"flex flex-col gap-y-2"} >
            <div className={"flex items-center justify-between"} >
                <p className={"text-xs uppercase text-neutral-500"} >Workspaces</p>
                <RiAddCircleFill className={"size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"} />
            </div>

            <Select>
                <SelectTrigger className={"w-full bg-neutral-200 font-medium p-1"} >
                    <SelectValue placeholder={"No workspace selected"} />
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map(workspace => (
                        <SelectItem
                            key={workspace.$id}
                            value={workspace.$id}
                        >
                            <div className={"flex justify-start items-center font-medium gap-3"} >
                                <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
                                <span className={"truncate"} >{workspace.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    );
};

export default WorkspaceSwitcher;
