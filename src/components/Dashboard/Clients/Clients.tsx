import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"

import {
  useGetClientsQuery,
  useDeleteClientMutation,
} from "@/features/clients/clientApi"

export default function ClientsTable() {
  const { data, isLoading, isError } = useGetClientsQuery({
    page: 1,
    limit: 100
  })
  const clients = data?.data ?? []
  const [deleteClient, { isLoading: isDeleting }] =
    useDeleteClientMutation()

  const handleDelete = async (id: string) => {
    try {
      await deleteClient(id).unwrap()
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Loading */}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          )}

          {/* Error */}
          {isError && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-red-500">
                Failed to load clients
              </TableCell>
            </TableRow>
          )}

          {/* Empty State */}
          {!isLoading && clients.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No clients found
              </TableCell>
            </TableRow>
          )}

          {/* Data */}
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="">
                {client.name}
              </TableCell>

              <TableCell>{client.company ?? "-"}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone ?? "-"}</TableCell>
              <TableCell>{client.address ?? "-"}</TableCell>
              <TableCell>{client.status}</TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                    >
                      <MoreHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleDelete(client.id)}
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
    </div>
  )
}
