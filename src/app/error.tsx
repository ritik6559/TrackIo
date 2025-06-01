'use client';

import {AlertTriangle} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => (
    <div
        className={"flex flex-col gap-y-2 min-h-screen items-center justify-center"}
    >
        <AlertTriangle />
        <p
            className={"text-sm gap-y-2 items-center justify-center"}
        >
            Something went wrong.
        </p>
        <Button
            variant={"secondary"}
            asChild
        >
            <Link href={'/public'}>
                Back to home
            </Link>
        </Button>
    </div>
)

export default ErrorPage;
