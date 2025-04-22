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
import {Workspace} from "@/features/workspaces/types";
import {useUpdateWorkspace} from "@/features/workspaces/api/use-update-workspace";

interface EditWorkspaceFormProps {
    onCancel?: () => void;
    initialValues: Workspace
}

const EditWorkspaceForm = ({ onCancel, initialValues } : EditWorkspaceFormProps ) => {

    const router = useRouter()
    const { mutateAsync } = useUpdateWorkspace();

    const [ isLoading, setLoading ] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
        resolver: zodResolver(updateWorkspaceSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? ""
        }
    });

    console.log(initialValues)

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

    return (
        <Card
            className={"w-full h-fill border-none shadow-none"}
        >
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
    );
};

export default EditWorkspaceForm;
