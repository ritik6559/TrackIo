import React from 'react';
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import EditWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";
import {getWorkspace} from "@/features/workspaces/queries";

interface WorkSpaceSettingsPageProps {
    params: {
        workspaceId: string;
    }
}

const WorkSpaceSettingPage = async ({
    params,
} : WorkSpaceSettingsPageProps) => {

    const user = await getCurrent();

    if(!user) {
        redirect("/sign-in");
    }

    const initialValues = await getWorkspace({  workspaceId: params.workspaceId })

    if(!initialValues) {
        redirect(`/workspaces/${params.workspaceId}`);
    }

    return (
        <div className={"w-full lg:max-w-xl"} >
           <EditWorkspaceForm initialValues={initialValues}/>
        </div>
    );
};

export default WorkSpaceSettingPage;
