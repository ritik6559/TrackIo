'use client';

import {useQueryState, parseAsString} from "nuqs";

export const useUpdateTaskModal = () => {

    // this will allow us to maintain the opening and closing state of modal with query parameter instead of maintaining a global state
    // management and our url will look like this /create-workspace=true, but if create-workspace is false i don't want to show create-workspace=false in the url
    // parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }), this line prevents from showing create-workspace=false
    const [ taskId, setTaskId ] = useQueryState(
        "edit-task",
        parseAsString
    );



    const open = (id: string) => setTaskId(id);
    const close = () => setTaskId(null);

    return {
        taskId,
        open,
        close,
        setTaskId
    };
};
