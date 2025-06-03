import { client } from '@/lib/rpc';
import {useQuery} from "@tanstack/react-query";
import {TaskStatus} from "@/features/tasks/types";

interface UseGetTasksProps {
    workspaceId: string;
    projectId?: string | null;
    status? :TaskStatus | null;
    assigneeId? : string | null;
    dueDate? :string | null;
    search?: string | null
}

export const useGetTasks = ({
    workspaceId,
    projectId,
    search,
    status,
    assigneeId,
    dueDate
}: UseGetTasksProps) => {
    const query = useQuery({
        queryKey: ["projects", workspaceId, projectId, status, search, assigneeId, dueDate ],
        queryFn: async () => {
            const response = await client.api.tasks.$get({
                query: {
                    workspaceId,
                    projectId: projectId ?? undefined,
                    status: status ?? undefined,
                    assigneeId: assigneeId ?? undefined,
                    search: search ?? undefined,
                    dueDate: dueDate ?? undefined
                }
            });

            if(!response.ok){
                throw new Error("Failed to load tasks");
            }

            const { data } = await response.json();

            return data;
        }
    });

    return query;
}
