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
import { clientService, type Client } from "@/services/clientService"
import { MoreHorizontalIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function ClientsTable() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await clientService.getClients()

        // ⚠️ তোমার backend response অনুযায়ী adjust করো
        // যদি res.data.data হয় তাহলে:
        setClients(res.data)

      } catch (error) {
        console.error("Failed to fetch clients", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          )}

          {!loading && clients.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No clients found
              </TableCell>
            </TableRow>
          )}

          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">
                {client.name}
              </TableCell>

              <TableCell>
                {client.company ?? "-"}
              </TableCell>

              <TableCell>
                {client.email}
              </TableCell>

              <TableCell>
                {client.phone ?? "-"}
              </TableCell>

              <TableCell>
                {client.address ?? "-"}
              </TableCell>

              <TableCell>
                {client.status}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem variant="destructive">
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
