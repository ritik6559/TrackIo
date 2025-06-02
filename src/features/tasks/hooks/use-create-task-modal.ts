'use client';

import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateTaskModal = () => {

    // this will allow us to maintain the opening and closing state of modal with query parameter instead of maintaining a global state
    // management and our url will look like this /create-workspace=true, but if create-workspace is false i don't want to show create-workspace=false in the url
    // parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }), this line prevents from showing create-workspace=false
    const [ isOpen, setIsOpen ] = useQueryState(
        "create-task",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
    );

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen,
        open,
        close,
        setIsOpen
    };
};
