import React from 'react';
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import WorkspaceJoinClient from "@/app/(standalone)/workspaces/[workspaceId]/join/[inviteCode]/client";

const Join = async () => {

    const user = await getCurrent();

    if(!user){
        redirect("/sign-in")
    }

    return (
       <WorkspaceJoinClient />
    );
};

export default Join;
