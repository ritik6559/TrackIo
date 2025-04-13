import React from 'react';
import {Button} from "@/components/ui/button";

const Home = () => {
    return (
        <div>
            <Button
                variant="destructive"
            >
                Hello
            </Button>
            <p
                className={"text-red-500"}
            >
                Ritik
            </p>
        </div>
    );
};

export default Home;
