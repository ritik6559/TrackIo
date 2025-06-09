import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import { z } from "zod";
import {Form, FormControl, FormField, FormLabel, FormMessage, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {createTaskSchema} from "@/features/tasks/schema";
import {DatePicker} from "@/components/date-picker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import MemberAvatar from "@/features/members/components/member-avatar";
import {Task, TaskStatus} from "@/features/tasks/types";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import {useUpdateTask} from "@/features/tasks/api/use-update-task";

interface EditTaskFormProps {
    onCancel?: () => void;
    projectOptions: {id: string, name: string, imageUrl: string}[];
    memberOptions: {id: string, name: string}[];
    initialValues: Task;
}

const EditTaskForm = ({ onCancel, projectOptions, memberOptions, initialValues } : EditTaskFormProps ) => {

    const { mutateAsync } = useUpdateTask();

    const [ isLoading, setLoading ] = useState(false);

    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema.omit({workspaceId: true, description: true})),
        defaultValues: {
            ...initialValues,
            dueDate: initialValues.dueDate ? new Date(initialValues.dueDate) : undefined
        }
    });

    const onSubmit = async (values: z.infer<typeof createTaskSchema>) => {
        setLoading(true);

        try {
            const { data } = await mutateAsync({ json: values, param: {
                taskId: initialValues.$id
            } });
            console.log(data);
            form.reset();
            onCancel?.()
            // onCancel?.();
        } catch (error) {
            console.error("Error creating workspace", error);
        } finally {
            setLoading(false);
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
                    Edit Task
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
                                            Task Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={`Enter task name`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={"dueDate"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Due Date
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={"assigneeId"}
                                render={({ field }) => (
                                    <FormItem className={"w-full"} >
                                        <FormLabel>
                                            Assignee
                                        </FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className={"w-full"} >
                                                    <SelectValue placeholder={"Select assignee"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage />
                                            <SelectContent>
                                                {
                                                    memberOptions.map((member) => (
                                                        <SelectItem
                                                            key={member.id}
                                                            value={member.id}
                                                        >
                                                            <div
                                                                className={"flex items-center gap-x-2"}
                                                            >
                                                                <MemberAvatar className={member.name} name={member.name} />
                                                                {member.name}
                                                            </div>
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={"status"}
                                render={({ field }) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel>
                                            Select Status
                                        </FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className={"w-full"} >
                                                    <SelectValue placeholder={"Select status"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage />
                                            <SelectContent>
                                                <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                                                <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                                                <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                                                <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                                                <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={"projectId"}
                                render={({ field }) => (
                                    <FormItem className={"w-full"} >
                                        <FormLabel>
                                            Project
                                        </FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className={"w-full"} >
                                                    <SelectValue placeholder={"Select project"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage />
                                            <SelectContent>
                                                {
                                                    projectOptions.map((project) => (
                                                        <SelectItem
                                                            key={project.id}
                                                            value={project.id}
                                                        >
                                                            <div
                                                                className={"flex items-center gap-x-2"}
                                                            >
                                                                <ProjectAvatar className={project.name} name={project.name} image={project.imageUrl} />
                                                                {project.name}
                                                            </div>
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
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

export default EditTaskForm;
