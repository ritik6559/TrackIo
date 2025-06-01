import React from 'react';
import Link from "next/link";
import Image from "next/image";
import DottedSeparator from "@/components/dotted-separator";
import {Navigation} from "@/components/navigation";
import WorkspaceSwitcher from "@/components/workspace-switcher";
import Projects from "@/components/projects";

const Sidebar = () => {
    return (
        <aside className={"h-full bg-neutral-100 p-4 w-full"} >
            <Link
                href={"/"}
            >
                <Image src={"/logo.svg"} alt={""} width={120} height={48} />
            </Link>

            <DottedSeparator className={"my-4"} />
            <WorkspaceSwitcher />
            <DottedSeparator className={"my-4"} />
            <Navigation />
            <DottedSeparator className={"my-4"} />
            <Projects />
        </aside>
    );
};

export default Sidebar;
