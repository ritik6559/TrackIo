import React from 'react';
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {getWorkspaceInfo} from "@/features/workspaces/queries";
import workspaceAvatar from "@/features/workspaces/components/workspace-avatar";

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

    const workspace = await getWorkspaceInfo({workspaceId: params.workspaceId});




    return (
        <div>
            {JSON.stringify(workspace, null, 2)}
        </div>
    );
};

export default Join;
