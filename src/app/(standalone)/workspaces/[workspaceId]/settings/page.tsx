import React from 'react';
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import WorkspaceSettingsClient from "@/app/(standalone)/workspaces/[workspaceId]/settings/client";

const WorkSpaceSettingPage = async () => {

    const user = await getCurrent();

    if(!user) {
        redirect("/sign-in");
    }


    return (
        <WorkspaceSettingsClient />
    );
};

export default WorkSpaceSettingPage;
