'use client'

import React from 'react';
import ResponsiveModal from "@/components/responsive-modal";
import {useUpdateTaskModal} from "@/features/tasks/hooks/use-update-task-modal";
import EditTaskFormWrapper from "@/features/tasks/components/edit-task-form-wrapper";

const EditTaskModal = () => {

    const { taskId, close } = useUpdateTaskModal()

    return (
        <ResponsiveModal open={!!taskId} onOpenChange={close}>
            {
                taskId && (
                    <EditTaskFormWrapper onCancel={close} id={taskId} />
                )
            }
        </ResponsiveModal>
    );
};

export default EditTaskModal;
