import React from 'react';
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useGetProjects} from "@/features/projects/api/use-get-projects";
import {useGetMembers} from "@/features/members/api/use-get-members";
import {Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FolderIcon, ListChecks, UsersIcon} from "lucide-react";
import {TaskStatus} from "@/features/tasks/types";
import {useTaskFilters} from "@/features/tasks/hooks/use-task-filters";
import {DatePicker} from "@/components/date-picker";

interface DataFiltersProps {
    hideProjectFilters?: boolean;
}

const DataFilters = ({ hideProjectFilters }: DataFiltersProps) => {

    const workspaceId = useWorkspaceId();

    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

    const isLoading = isLoadingProjects || isLoadingMembers;

    const projectOptions = projects?.documents.map(project => ({
        value: project.$id,
        label: project.name
    }));

    const memberOptions = members?.documents.map(member => ({
        value: member.$id,
        label: member.name
    }));

    const [{
        status,
        assigneeId,
        projectId,
        dueDate
    }, setFilters] = useTaskFilters();

    const onStatusChange = (value: string) => {
        if( value === "all" ){
            setFilters({ status: null });
        } else {
            setFilters({ status: value as TaskStatus });
        }
    }

    const onAssigneeChange = (value: string) => {
        if( value === "all" ){
            setFilters({ assigneeId: null });
        } else {
            setFilters({ assigneeId: value as string });
        }
    }

    const onProjectChange = (value: string) => {
        if( value === "all" ){
            setFilters({ projectId: null });
        } else {
            setFilters({ projectId: value as string });
        }
    }

    if(isLoading){
        return null;
    }

    return (
        <div
            className={"flex flex-col lg:flex-row gap-2"}
        >
            <Select
                defaultValue={status ?? undefined}
                onValueChange={(value) => onStatusChange(value)}
            >
                <SelectTrigger className={"w-full lg:w-auto h-8"} >
                    <div className={"flex items-center pr-2"} >
                        <ListChecks className={"size-4 mr-2"} />
                        <SelectValue placeholder={"All statuses"} />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={"all"}>
                        All Statuses
                    </SelectItem>
                    <SelectSeparator/>
                    <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                    <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                    <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                </SelectContent>
            </Select>

            <Select
                defaultValue={assigneeId ?? undefined}
                onValueChange={(value) => onAssigneeChange(value)}
            >
                <SelectTrigger className={"w-full lg:w-auto h-8"} >
                    <div className={"flex items-center pr-2"} >
                        <UsersIcon className={"size-4 mr-2"} />
                        <SelectValue placeholder={"All assignees"} />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={"all"}>
                        All assignees
                    </SelectItem>
                    <SelectSeparator/>
                    {
                        memberOptions!.map(member => (
                            <SelectItem key={member.value} value={member.value}>
                                {member.label}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

             { !hideProjectFilters && (
                 <Select
                    defaultValue={projectId ?? undefined}
                    onValueChange={(value) => onProjectChange(value)}
                >

                    <SelectTrigger className={"w-full lg:w-auto h-8"}>
                        <div className={"flex items-center pr-2"}>
                            <FolderIcon className={"size-4 mr-2"}/>
                            <SelectValue placeholder={"All projects"}/>
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"all"}>
                            All projects
                        </SelectItem>
                        <SelectSeparator/>
                        {
                            projectOptions!.map(project => (
                                <SelectItem key={project.value} value={project.value}>
                                    {project.label}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
             )}

            <DatePicker placeholder={"Due date"} className={"h-8 w-full lg:w-auto"} value={dueDate ? new Date(dueDate) : undefined} onChange={(date) => setFilters({ dueDate: date ? date.toISOString() : null})} />

        </div>
    );
};

export default DataFilters;
