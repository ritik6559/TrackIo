"use client"

import React, {useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import {updateWorkspaceSchema} from "@/features/workspaces/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import { z } from "zod";
import {Form, FormControl, FormField, FormLabel, FormMessage, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {ArrowLeftIcon, CopyIcon, ImageIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Workspace} from "@/features/workspaces/types";
import {useUpdateWorkspace} from "@/features/workspaces/api/use-update-workspace";
import useConfirm from "@/app/hooks/use-confirm";
import {useDeleteWorkspace} from "@/features/workspaces/api/use-delete-workspace";
import {toast} from "sonner";
import {useResetInviteCode} from "@/features/workspaces/api/use-reset-invite-code";

interface EditWorkspaceFormProps {
    onCancel?: () => void;
    initialValues: Workspace
}

const EditWorkspaceForm = ({ onCancel, initialValues } : EditWorkspaceFormProps ) => {

    const router = useRouter()
    const { mutateAsync } = useUpdateWorkspace();
    const { mutateAsync: deleteWorkspace, isPending: isDeletingWorkspace } = useDeleteWorkspace();
    const { mutateAsync: resetInviteCode, isPending: isResettingInviteCode } = useResetInviteCode();

    const [ isLoading, setLoading ] = useState(false);

    const fullInviteCode = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`

    const [ DeleteDialog, confirmDelete ] = useConfirm(
        "Delete Workspace",
        "This action cannot be undone."
    );

    const [ ResetDialog, confirmReset ] = useConfirm(
        "Reset Invite Code",
        "This action cannot be undone."
    );

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
        resolver: zodResolver(updateWorkspaceSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? ""
        }
    });

    const handleDelete = async () => {
        const ok = await confirmDelete();

        if(!ok){
            return;
        }

        await deleteWorkspace({
            param: {workspaceId: initialValues.$id}
        }, {
            onSuccess: () => {
                window.location.href = "/"
            }
        });
    };

    const handleResetInviteCode = async () => {
        const ok = await confirmReset();

        if(!ok){
            return;
        }

        await resetInviteCode({
            param: {workspaceId: initialValues.$id}
        }, {
            onSuccess: () => {
                router.refresh();
            }
        });
    };

    const onSubmit = async (values: z.infer<typeof updateWorkspaceSchema>) => {
        setLoading(true);

        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        };

        try {
            const { data } = await mutateAsync({ form: finalValues, param :{ workspaceId: initialValues.$id } });
            form.reset();
            router.push(`/workspaces/${data.$id}`);
        } catch (error) {
            console.error("Error creating workspace", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file =  e.target.files?.[0];
        if( file ){
            form.setValue("image", file);
        }
    };

    const handleCopyInviteLink = () => {
        navigator.clipboard.writeText(fullInviteCode)
            .then(() =>
                toast.success("Copied to clipboard"))
    }

    return (
        <div className={"flex flex-col gap-y-4"} >
            <DeleteDialog />
            <ResetDialog />
            <Card className={"w-full h-fill border-none shadow-none"}>
            <CardHeader
                className={"flex flex-row items-center gap-x-4 p-7 space-y-0"}
            >
                <Button size={"sm"} variant={"secondary"} onClick={onCancel ? onCancel : () => { router.push(`/workspaces/${initialValues.workspaceId}`); }} >
                    Back
                    <ArrowLeftIcon className="size-4 mr-2" />
                </Button>
                <CardTitle
                    className={"text-xl font-bold"}
                >
                    {initialValues.name}
                </CardTitle>
            </CardHeader>

            <div
                className={"px-7"}
            >
                <DottedSeparator />
            </div>

            <CardContent
                className={"p-7"}
            >
                <Form
                    {...form}
                >
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className={"flex flex-col gap-y-4"} >
                            <FormField
                                control={form.control}
                                name={"name"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Workspace Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={`Enter workspace name`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={"image"}
                                render={({ field }) => (
                                    <div className={"flex flex-col gap-y-2"} >
                                        <div className="flex relative items-center gap-x-5" >
                                            { field.value ? (
                                                <div className="size-[72px] relative rounded-md overflow-hidden" >
                                                    <Image
                                                        alt={"Logo"}
                                                        fill
                                                        className={"object-cover"}
                                                        src={
                                                            field.value instanceof File
                                                                ? URL.createObjectURL(field.value)
                                                                : field.value
                                                        }

                                                    />
                                                </div>
                                            ) : (
                                                <Avatar className={"size-[72px]"} >
                                                    <AvatarFallback>
                                                        <ImageIcon className={"size-[36px] text-neutral-400"} />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col" >
                                                <p className={"text-sm"} >Workspace Icon</p>
                                                <p className={"text-sm text-muted-foreground"}>
                                                    JPG, PNG, SVG or JPEG, max 1mb
                                                </p>
                                                <input
                                                    className={"hidden"}
                                                    type={"file"}
                                                    ref={inputRef}
                                                    disabled={isLoading}
                                                    onChange={handleImageChange}
                                                    accept={".jpg, .png, .jpeg, .svg"}
                                                />
                                                { field.value ? (
                                                    <Button
                                                        type={"button"}
                                                        disabled={isLoading}
                                                        variant="destructive"
                                                        size={"xs"}
                                                        className={"w-fit mt-2"}
                                                        onClick={() => {
                                                            field.onChange(null);
                                                            if( inputRef.current ){
                                                                inputRef.current.value = ""
                                                            }
                                                        }}
                                                    >
                                                        Remove Image
                                                    </Button>
                                                ) : (
                                                    <div>
                                                        <Button
                                                            type={"button"}
                                                            disabled={isLoading}
                                                            variant="teritary"
                                                            size={"xs"}
                                                            className={"w-fit mt-2"}
                                                            onClick={() => inputRef.current?.click()}
                                                        >
                                                            Upload Image
                                                        </Button>
                                                    </div>
                                                )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />

                            <DottedSeparator className={"py-3"} />

                            <div className={"flex items-center justify-between"} >
                                <Button
                                    type={"button"}
                                    size={"lg"}
                                    variant={"secondary"}
                                    onClick={onCancel}
                                    disabled={isLoading}
                                    className={cn(!onCancel && "invisible")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type={"submit"}
                                    size={"lg"}
                                    onClick={onCancel}
                                    disabled={isLoading}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>

            </CardContent>
        </Card>

            <Card className={"w-full h-full border-none shadow-none"} >
                <CardContent className={"p-7"} >
                    <div className={"flex flex-col"} >
                        <h3 className={"font-bold"} >Invite Members</h3>
                        <p className={"text-sm text-muted-foreground"}>Use the invite link to add members to your workspace.</p>
                        <div className={"mt-4"} >
                            <div className={"flex items-center gap-x-2"} >
                                <Input disabled value={fullInviteCode}/>
                                <Button
                                    onClick={handleCopyInviteLink}
                                    variant="secondary"
                                    className={"size-12"}
                                >
                                    <CopyIcon className={"size-5"} />
                                </Button>
                            </div>
                        </div>
                        <DottedSeparator className={"py-7"} />
                        <Button
                            className={"mt-6 w-fit ml-auto"}
                            size={"sm"}
                            variant={"destructive"}
                            type={"button"}
                            disabled={isLoading || isDeletingWorkspace}
                            onClick={handleResetInviteCode}
                        >
                            Reset Invite Link
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className={"w-full h-full border-none shadow-none"} >
                <CardContent className={"p-7"} >
                    <div className={"flex flex-col"} >
                        <h3 className={"font-bold"} >Danger Zone</h3>
                        <p className={"text-sm text-muted-foreground"}>Deleting a workspace is irreversible and will remove all associated data.</p>
                        <DottedSeparator className={"py-7"} />
                        <Button
                            className={"mt-6 w-fit ml-auto"}
                            size={"sm"}
                            variant={"destructive"}
                            type={"button"}
                            disabled={isLoading || isDeletingWorkspace}
                            onClick={handleDelete}
                        >
                            Delete Workspace
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditWorkspaceForm;
