import React from 'react';
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {getWorkspaceInfo} from "@/features/workspaces/queries";
import workspaceAvatar from "@/features/workspaces/components/workspace-avatar";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";

interface JoinPageProps {
    params: {
        workspaceId: string;
    }
}

const Join = async ({
    params
}: JoinPageProps) => {

    const user = await getCurrent();

    if(!user){
        redirect("/sign-in")
    }

    const initialValues = await getWorkspaceInfo({workspaceId: params.workspaceId});

    if(!initialValues){
        redirect("/")
    }


    return (
        <div className={"w-full lg:max-w-xl"} >
            <JoinWorkspaceForm initialValues={initialValues!} />
         </div>
    );
};

export default Join;
