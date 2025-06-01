import { InferResponseType, InferRequestType } from "hono";
import {client} from "@/lib/rpc";
import { toast } from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$delete"]>

export const useDeleteProject = () => {

    const queryClient = useQueryClient();
    const router = useRouter();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ param }) => {
            const response = await client.api.projects[":projectId"]["$delete"]({ param });

            if( !response.ok ) {
                throw new Error("Failed to delete project");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Project deleted successfully");
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["projects", data.$id] })
        },
        onError: () => {
            toast.error("Failed to delete projects");
        }
    });

    return mutation;
}
