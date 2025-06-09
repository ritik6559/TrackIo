import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import React from "react";
import CreateWorkspaceModal from "@/features/workspaces/components/create-workspace-modal";
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {getWorkspaces} from "@/features/workspaces/queries";
import CreateProjectModal from "@/features/projects/components/create-project-modal";
import CreateTaskModal from "@/features/tasks/components/create-task-modal";
import EditTaskModal from "@/features/tasks/components/edit-task-modal";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = async  ({ children } : DashboardLayoutProps) => {

    const user = await getCurrent();

    if(!user) {
        redirect("/sign-in");
    }

    const workspaces = await getWorkspaces();

    if( workspaces?.total === 0 ){
        redirect("/workspaces/create");
    }

    return (
        <div
            className={"min-h-screen"}
        >
            <CreateWorkspaceModal />
            <CreateProjectModal />
            <CreateTaskModal />
            <EditTaskModal />
            <div
                className={"flex w-full h-full"}
            >
                <div
                    className={"fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto"}
                >
                    <Sidebar />
                </div>

                <div
                    className={"lg:pl-[264px] w-full"}
                >
                    <div className={"mx-auto max-w-screen-2xl h-full"} >
                        <Navbar />
                        <main className={"h-full py-8 px-6 flex flex-col"} >
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DashboardLayout;
