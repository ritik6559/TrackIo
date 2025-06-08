import React from 'react';
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import AnalyticsCard from "@/components/analytics-card";
import DottedSeparator from "@/components/dotted-separator";

interface AnalyticsProps {
    data?: {
        taskCount: number;
        taskDifference: number;
        projectCount?: number;
        projectDifference?: number;
        assignedTaskCount: number;
        assignedTaskDifference: number;
        completeTasksCount: number;
        completeTaskDifference: number;
        incompleteTasksCount?: number;
        incompleteTaskDifference?: number;
        overdueTasksCount: number;
        overdueTaskDifference: number;
    }
}

const Analytics = ({
    data
}: AnalyticsProps) => {

    if( !data ){
        return null;
    }

    return (
        <ScrollArea className={"border rounded-lg w-full whitespace-nowrap shrink-0"} >
            <div className={"w-full flex flex-row"} >
                <div className={"flex items-center flex-1"} >
                    <AnalyticsCard
                        title={"Total Tasks"}
                        value={data.taskCount}
                        variant={data.taskDifference > 0 ? "up" : "down"}
                        increaseValue={data.taskDifference}
                    />
                    <DottedSeparator direction={"vertical"} />
                </div>
                <div className={"flex items-center flex-1"} >
                    <AnalyticsCard
                        title={"Assigned Tasks"}
                        value={data.assignedTaskCount}
                        variant={data.assignedTaskDifference > 0 ? "up" : "down"}
                        increaseValue={data.assignedTaskDifference}
                    />
                    <DottedSeparator direction={"vertical"} />
                </div>
                <div className={"flex items-center flex-1"} >
                    <AnalyticsCard
                        title={"Completed Tasks"}
                        value={data.completeTasksCount}
                        variant={data.completeTaskDifference > 0 ? "up" : "down"}
                        increaseValue={data.completeTaskDifference}
                    />
                    <DottedSeparator direction={"vertical"} />
                </div>
                <div className={"flex items-center flex-1"} >
                    <AnalyticsCard
                        title={"Incomplete Tasks"}
                        value={data.incompleteTasksCount ?? 0}
                        variant={data.incompleteTaskDifference ?? 0 > 0 ? "up" : "down"}
                        increaseValue={data.incompleteTaskDifference ?? 0}
                    />
                    <DottedSeparator direction={"vertical"} />
                </div>
                <div className={"flex items-center flex-1"} >
                    <AnalyticsCard
                        title={"Overdue Tasks"}
                        value={data.overdueTasksCount ?? 0}
                        variant={data.overdueTaskDifference ?? 0 > 0 ? "up" : "down"}
                        increaseValue={data.overdueTaskDifference ?? 0}
                    />
                </div>
            </div>
            <ScrollBar orientation={"horizontal"} />
        </ScrollArea>
    );
};

export default Analytics;
