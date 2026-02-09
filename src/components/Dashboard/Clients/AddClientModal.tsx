"use client"

import useModal from "@/components/Modal/useModal"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AddClientForm } from "./Add-Client-Form"

export default function AddClientModal() {
    const { close } = useModal()

    return (
        <Dialog open onOpenChange={() => close(["modal"])}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Client</DialogTitle>
                </DialogHeader>

                {/* form */}
                <AddClientForm />

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => close(["modal"])}
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
