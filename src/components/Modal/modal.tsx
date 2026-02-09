import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";



interface ModalProps {
    modalId: string;
    openId: string;
    closeModals?: string[];
    className?: string;
}

export default function Modal({
    openId,
    modalId,
    closeModals,
    className,
    children
}: PropsWithChildren<ModalProps>) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const modal = searchParams.get(modalId);

    //handle open change
    const handleOpenChange = (open: boolean) => {
        let newUrl: string | null;
        if (open) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: modalId,
                value: openId,
            });
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: closeModals ?? [],
            });
        }
        //replace URL without scrolling
        navigate(newUrl || "/dashboard", { replace: true })
    }

    return (
        <Dialog open={modal === openId} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild hidden />
            <DialogContent
                className={cn(
                    "min-h-auto min-w-fit border-none bg-transparent p-0 shadow-none [&>button]:hidden",
                    className,
                )}
            >
                <DialogHeader hidden>
                    <DialogTitle hidden />
                    <DialogDescription hidden>
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )

}