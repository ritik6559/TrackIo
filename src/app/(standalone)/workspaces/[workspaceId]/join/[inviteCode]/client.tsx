"use client"

import React from 'react';
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import PageLoader from "@/components/page-loader";
import PageError from "@/components/page-error";
import {useGetWorkspaceInfo} from "@/features/workspaces/api/use-get-workspace-info";

const WorkspaceJoinClient = () => {

    const workspaceId = useWorkspaceId();

    const { data: initialValues, isLoading } = useGetWorkspaceInfo({
        workspaceId: workspaceId,
    });

    if(isLoading) {
        return <PageLoader />
    }

    if(!initialValues) {
        console.log("initialValues", initialValues);
        return <PageError message={"Workspace does not exist,"} />
    }

    return (
        <div className={"w-full lg:max-w-xl"} >
            <JoinWorkspaceForm initialValues={initialValues!} />
        </div>
    );
};

export default WorkspaceJoinClient;
