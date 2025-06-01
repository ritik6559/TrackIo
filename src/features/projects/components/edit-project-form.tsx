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
import {ArrowLeftIcon, ImageIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import useConfirm from "@/app/hooks/use-confirm";
import {useUpdateProject} from "@/features/projects/api/use-update-project";
import {Project} from "@/features/projects/types";
import {updateProjectSchema} from "@/features/projects/schema";
import {useDeleteProject} from "@/features/projects/api/use-delete-project";

interface EditProjectFormProps {
    onCancel?: () => void;
    initialValues: Project
}

const EditProjectForm = ({ onCancel, initialValues } : EditProjectFormProps ) => {

    const router = useRouter()
    const { mutateAsync } = useUpdateProject();
    const { mutateAsync: deleteProject, isPending: isDeletingWorkspace } = useDeleteProject();

    const [ isLoading, setLoading ] = useState(false);


    const [ DeleteDialog, confirmDelete ] = useConfirm(
        "Delete Project",
        "This action cannot be undone."
    );


    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof updateProjectSchema>>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? ""
        }
    });

     const handleDelete = async () => {
        try {
            const ok = await confirmDelete();

            setLoading(true);

            if (!ok) {
                return;
            }

            await deleteProject({
                param: {projectId: initialValues.$id}
            }, {
                onSuccess: () => {
                    window.location.href = `/workspaces/${initialValues.workspaceId}`
                }
            });
        }
        catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
     };

    const onSubmit = async (values: z.infer<typeof updateWorkspaceSchema>) => {
        setLoading(true);

        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        };

        try {
            const { data } = await mutateAsync({ form: finalValues, param :{ projectId: initialValues.$id } });
            form.reset();
            window.location.reload()
        } catch (error) {
            console.error("Error updating project", error);
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


    return (
        <div className={"flex flex-col gap-y-4"} >
            <DeleteDialog />
            <Card className={"w-full h-fill border-none shadow-none"}>
                <CardHeader
                    className={"flex flex-row items-center gap-x-4 p-7 space-y-0"}
                >
                    <Button size={"sm"} variant={"secondary"} onClick={onCancel ? onCancel : () => { router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`); }} >
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
                                                Project Name
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
                        <h3 className={"font-bold"} >Danger Zone</h3>
                        <p className={"text-sm text-muted-foreground"}>Deleting a project is irreversible and will remove all associated data.</p>
                        <DottedSeparator className={"py-7"} />
                        <Button
                            className={"mt-6 w-fit ml-auto"}
                            size={"sm"}
                            variant={"destructive"}
                            type={"button"}
                            disabled={isLoading }
                            onClick={handleDelete}
                        >
                            Delete Project
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditProjectForm;
