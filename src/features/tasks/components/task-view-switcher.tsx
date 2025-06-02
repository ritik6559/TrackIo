import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";

const TaskViewSwitcher = () => {
    return (
        <Tabs
            className={"flex-1 w-full border rounded-lg"}
        >
            <div
                className={"h-full flex flex-col overflow-auto p-4"}
            >
                <div
                    className={"flex flex-col gap-y-2 lg:flex-row justify-between items-center"}
                >
                    <TabsList
                        className={"w-full lg:w-auto"}
                    >
                        <TabsTrigger
                            value={'table'}
                            className={"h-8 w-full lg:w-auto"}
                        >
                                Table
                        </TabsTrigger>
                        <TabsTrigger
                            value={'kanban'}
                            className={"h-8 w-full lg:w-auto"}
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            value={'calendar'}
                            className={"h-8 w-full lg:w-auto"}
                        >
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        size={"sm"}
                        className={"w-full lg:w-auto"}
                    >
                        <PlusIcon
                            className={"size=4 mr-2"}
                        />
                        New Task
                    </Button>
                </div>
                <DottedSeparator className={"my-4"} />
                Data Filter
                <DottedSeparator className={"my-4"} />
                <>
                    <TabsContent
                        className={"mt-8"}
                        value={'table'}
                    >
                        Data table
                    </TabsContent>
                    <TabsContent
                        className={"mt-8"}
                        value={'kanban'}
                    >
                        Data Kanban
                    </TabsContent>
                    <TabsContent
                        className={"mt-8"}
                        value={'calendar'}
                    >
                        Data calendar
                    </TabsContent>
                </>
            </div>
        </Tabs>
    )
}


export default TaskViewSwitcher;
