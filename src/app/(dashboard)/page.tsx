import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import {getWorkspaces} from "@/features/workspaces/queries";

const Home = async () => {

    const user = await getCurrent();
    const workspaces = await getWorkspaces();

    if( !user ) {
        redirect("/sign-in")
    }

    if( workspaces?.total === 0 ){
        redirect("/workspaces/create");
    } else {
        redirect(`workspaces/${workspaces?.documents[0].$id}`);
    }



};

export default Home;
