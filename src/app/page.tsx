import UserButton from "@/features/auth/components/UserButton";
import {getCurrent} from "@/features/auth/actions";
import {redirect} from "next/navigation";

const Home = async () => {

    const user = await getCurrent()

    if( !user ) {
        redirect("/sign-in")
    }

    return (
        <div>
           <UserButton />
        </div>
    );
};

export default Home;
