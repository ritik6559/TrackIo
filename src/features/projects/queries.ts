import {createSessionClient} from "@/lib/appwrite";
import {getMember} from "@/features/members/utils";
import {DATABASE_ID, PROJECTS_ID} from "@/config";
import {Project} from "@/features/projects/types";

interface GetProjectProps {
    projectId: string;
}

export const getProject = async ({ projectId } : GetProjectProps) => {


        const { databases, account } = await createSessionClient();

        const user = await account.get();

        const project = await databases.getDocument<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            projectId
        );

        const member = await getMember({ databases, workspaceId: project.workspaceId, userId: user.$id });

        if(!member){
            throw new Error("Unauthorized");
        }

        return project;
}
