"use client"

import React from 'react';
import { useMedia } from "react-use";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ResponsiveModal = ({ children, open, onOpenChange } : ResponsiveModalProps) => {

    const isDesktop = useMedia("(min-width: 1024px)", true);

    if( isDesktop ) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTitle></DialogTitle>
                <DialogContent className={"w-full sm:max-w-lg border-none overflow-y-auto hidden-scrollbar max-h-[85vh]"} >
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className={"overflow-y-auto hide-scrollbar max-h-[85vh]"} >
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    )
};

export default ResponsiveModal;
