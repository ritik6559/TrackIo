"use client"

import React, {useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import { z } from "zod";
import {Form, FormControl, FormField, FormLabel, FormMessage, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {ImageIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {useCreateProject} from "@/features/projects/api/use-create-project";
import {createProjectSchema} from "@/features/projects/schema";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useRouter} from "next/navigation";

interface CreateProjectFormProps {
    onCancel?: () => void;
}

const CreateProjectForm = ({ onCancel } : CreateProjectFormProps ) => {

    const workspaceId = useWorkspaceId();
    const { mutateAsync } = useCreateProject();
    const router = useRouter();
    const [ isLoading, setLoading ] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof createProjectSchema>>({
        resolver: zodResolver(createProjectSchema.omit({workspaceId: true})),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof createProjectSchema>) => {
        setLoading(true);

        const finalValues = {
            ...values,
            workspaceId: workspaceId,
            image: values.image instanceof File ? values.image : "",
        };

        try {
            const { data } = await mutateAsync({ form: finalValues });
            console.log(data);
            form.reset();
            router.push(`/workspaces/${workspaceId}/projects/${data.$id}`);
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

    return (
        <Card
            className={"w-full h-fill border-none shadow-none"}
        >
            <CardHeader
                className={"flex p-7"}
            >
                <CardTitle
                    className={"text-xl font-bold"}
                >
                    Create a new project
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
                                                placeholder={`Enter project name`}
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
                                                <p className={"text-sm"} >Project Icon</p>
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
                                    Create Project
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>

            </CardContent>
        </Card>
    );
};

export default CreateProjectForm;
