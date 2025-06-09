import React from 'react';
import SignInCard from "@/features/auth/components/sign-in-card";
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";

const SignIn = async () => {

    const user = await getCurrent();

    if( user ){
        redirect("/");
    }

    return <SignInCard />
};

export default SignIn;
