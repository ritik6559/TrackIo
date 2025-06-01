import React from 'react';
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {getProject} from "@/features/projects/queries";
import EditProjectForm from "@/features/projects/components/edit-project-form";

interface ProjectSettingsPageProps {
    params: {
        projectId: string;
    }
}

const ProjectSettingsPage = async ({ params }: ProjectSettingsPageProps) => {

    const user = await getCurrent();
    const initialValues = await getProject({projectId: params.projectId})

    if (!user) {
        redirect("/sign-in")
    }

    return (
        <div
            className={"w-full lg:max-w-xl"}
        >
            <EditProjectForm initialValues={initialValues} />
        </div>
    );
};

export default ProjectSettingsPage;
