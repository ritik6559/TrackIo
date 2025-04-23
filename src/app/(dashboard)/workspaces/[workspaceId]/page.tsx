import React from 'react';
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";

const WorkSpaceId = async () => {

    const user = await getCurrent();

    if(!user) {
        redirect("/sign-in");
    }

    return (
        <div>
            Workspace id
        </div>
    );
};

export default WorkSpaceId;
