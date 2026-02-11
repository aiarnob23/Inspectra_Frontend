import {
    useGetAssetsQuery,
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

import { useGetClientsQuery } from "@/features/clients/clientApi"

export default function AssetsTable() {
    const { data: assets = [], isLoading, isError } = useGetAssetsQuery()
    const { data } = useGetClientsQuery({
        page: 1,
        limit: 100, 
    })

    const clients = data?.data ?? []

    const [deleteAsset, { isLoading: isDeleting }] =
        useDeleteAssetMutation()

    const handleDelete = async (id: string) => {
        try {
            await deleteAsset(id).unwrap()
        } catch (error) {
            console.error("Delete failed", error)
        }
    }

    const getClientName = (clientId: string) => {
        const client = clients.find((c) => c.id === clientId)
        return client ? client.name : "-"
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {/* Loading */}
                {isLoading && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center py-6">
                            Loading...
                        </TableCell>
                    </TableRow>
                )}

                {/* Error */}
                {isError && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-red-500">
                            Failed to load assets
                        </TableCell>
                    </TableRow>
                )}

                {/* Empty */}
                {!isLoading && assets.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center py-6">
                            No assets found
                        </TableCell>
                    </TableRow>
                )}

                {/* Data */}
                {assets.map((asset) => (
                    <TableRow key={asset.id}>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>
                            {getClientName(asset.clientId)}
                        </TableCell>
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
                                        disabled={isDeleting}
                                    >
                                        Delete
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
