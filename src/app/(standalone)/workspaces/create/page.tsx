import React from 'react';
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";

const Page = async () => {

    const user = await getCurrent();

    if(!user) {
        redirect("/sign-in");
    }

    return (
        <div className={"w-full lg:max-w-xl"} >
            <CreateWorkspaceForm />
        </div>
    );
};

export default Page;
