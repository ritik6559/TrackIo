import {getCurrent} from "@/features/auth/actions";
import {redirect} from "next/navigation";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";

const Home = async () => {

    const user = await getCurrent()

    if( !user ) {
        redirect("/sign-in")
    }

    return (
        <div>
           <CreateWorkspaceForm />
        </div>
    );
};

export default Home;
