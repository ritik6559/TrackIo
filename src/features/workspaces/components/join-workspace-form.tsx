"use client";

import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useJoinWorkspace} from "@/features/workspaces/api/use-join-workspace";
import {useInviteCode} from "@/features/workspaces/hooks/use-invite-code";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useRouter} from "next/navigation";

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string
    }
}

const JoinWorkspaceForm = ({ initialValues } : JoinWorkspaceFormProps) => {

    const router = useRouter()
    const workspaceId = useWorkspaceId();
    const { mutateAsync } = useJoinWorkspace();
    const inviteCode = useInviteCode();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const onSubmit = async () => {

        setIsLoading(true);

        try {
            const { data } = await mutateAsync({
                param: { workspaceId },
                json: { code: inviteCode }
            });
            router.push(`/workspaces/${data.$id}`);
        } catch (error) {
            console.log("Error ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className={"w-full h-full border-none shadow-none"} >
            <CardHeader className={"p-7"} >
                <CardTitle className={"text-xl font-bold"} >
                    Join Workspace
                </CardTitle>
                <CardDescription>
                    You&#39;ve been invited to join <strong>{initialValues.name}</strong>
                </CardDescription>
            </CardHeader>
            <div className={"px-7"} >
                <DottedSeparator />
            </div>
            <CardContent className={"p-7"} >
                <div className={"flex flex-col gap-2 lg:flex-row items-center justify-between"} >
                    <Button
                        variant={"secondary"}
                        type={"button"}
                        asChild
                        size={"lg"}
                        className={"w-full lg:w-fit"}
                        disabled={isLoading}
                    >
                        <Link
                            href={"/"}
                        >
                            Cancel
                        </Link>

                    </Button>
                    <Button
                        type={"button"}
                        size={"lg"}
                        className={"w-full lg:w-fit"}
                        onClick={onSubmit}
                        disabled={isLoading}
                    >
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default JoinWorkspaceForm;
