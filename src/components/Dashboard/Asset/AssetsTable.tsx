"use client"

import {
    useDeleteAssetMutation,
} from "@/features/asset/assetApi"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { MoreHorizontalIcon } from "lucide-react"
import { useState } from "react"
import type { Asset } from "@/features/asset/assetApi"

interface Props {
    assets: Asset[]
    isLoading: boolean
    isError: boolean
}

export default function AssetsTable({
    assets,
    isLoading,
    isError,
}: Props) {

    const [deleteAsset] = useDeleteAssetMutation()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        try {
            setDeletingId(id)
            await deleteAsset(id).unwrap()
        } catch (error) {
            console.error("Delete failed", error)
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {isLoading && (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                            Loading...
                        </TableCell>
                    </TableRow>
                )}

                {isError && (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-red-500">
                            Failed to load assets
                        </TableCell>
                    </TableRow>
                )}

                {!isLoading && assets.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                            No assets found
                        </TableCell>
                    </TableRow>
                )}

                {assets.map((asset) => (
                    <TableRow key={asset.id}>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>{asset.client?.name ?? "-"}</TableCell>
                        <TableCell>{asset.client?.company ?? "-"}</TableCell>
                        <TableCell>{asset.type}</TableCell>
                        <TableCell>{asset.model}</TableCell>
                        <TableCell>{asset.location}</TableCell>

                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontalIcon />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => handleDelete(asset.id)}
                                        disabled={deletingId === asset.id}
                                    >
                                        {deletingId === asset.id ? "Deleting..." : "Delete"}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
