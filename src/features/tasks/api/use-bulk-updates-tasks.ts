import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "sonner";

type ResponseType = InferResponseType<typeof client.api.tasks["bulk-update"]["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.tasks["bulk-update"]["$post"]>;

export const useBulkUpdateTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json }) => {
            const response = await client.api.tasks["bulk-update"]["$post"]({ json });

            if(!response.ok){
                console.log(response)
                throw new Error("Failed to update tasks");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Tasks updated successfully.");
            queryClient.invalidateQueries({queryKey: ["project-analytics"]});
            queryClient.invalidateQueries({queryKey: ["workspace-analytics"]});
            queryClient.invalidateQueries({queryKey: ["tasks"]});

        },
        onError: (e) => {
            console.log(e)
            toast.error("Failed to update tasks");
        }
    });

    return mutation;
}
