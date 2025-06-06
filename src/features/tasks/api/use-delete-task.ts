import { InferResponseType, InferRequestType } from "hono";
import {client} from "@/lib/rpc";
import { toast } from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$delete"]>

export const useDeleteTask = () => {

    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ param }) => {
            console.log(param)
            const response = await client.api.tasks[":taskId"]["$delete"]({ param });

            if( !response.ok ) {
                throw new Error("Failed to delete task");
            }

            return await response.json();
        },
        onSuccess: async ({ data }) => {
            toast.success("Task deleted successfully");
            await queryClient.invalidateQueries({ queryKey: ["tasks"] });
            await queryClient.invalidateQueries({ queryKey: ["task", data.$id] })
        },
        onError: (e) => {
            toast.error("Failed to delete task");
        }
    });

    return mutation;
}
