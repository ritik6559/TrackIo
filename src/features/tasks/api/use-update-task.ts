import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "sonner";

type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>;

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ param, json }) => {
            const response = await client.api.tasks[":taskId"]["$patch"]({ param, json });

            if(!response.ok){
                console.log(response)
                throw new Error("Failed to update task");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Task updated successfully.");
            queryClient.invalidateQueries({queryKey: ["project-analytics"]});
            queryClient.invalidateQueries({queryKey: ["workspace-analytics"]});
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            queryClient.invalidateQueries({queryKey: ["task", data.$id]});

        },
        onError: (e) => {
            console.log(e)
            toast.error("Failed to update task");
        }
    });

    return mutation;
}
