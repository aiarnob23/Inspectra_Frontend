"use client"

import {
  useDeleteClientMutation,
} from "@/features/clients/clientApi"

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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { MoreHorizontalIcon } from "lucide-react"
import { useState } from "react"
import type { Client } from "@/features/clients/clientApi"

interface Props {
  clients: Client[]
  isLoading: boolean
  isError: boolean
}

export default function ClientsTable({
  clients,
  isLoading,
  isError,
}: Props) {

  const [deleteClient] = useDeleteClientMutation()
  const [deletingId, setDeletingId] =
    useState<string | null>(null)

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await deleteClient(id).unwrap()
    } catch (error) {
      console.error(error)
    } finally {
      setDeletingId(null)
    }
  }

  return (
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
              Failed to load clients
            </TableCell>
          </TableRow>
        )}

        {!isLoading && clients.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-6">
              No clients found
            </TableCell>
          </TableRow>
        )}

        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.company ?? "-"}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone ?? "-"}</TableCell>
            <TableCell>{client.address ?? "-"}</TableCell>
            <TableCell>{client.status}</TableCell>

            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      handleDelete(client.id)
                    }
                    disabled={deletingId === client.id}
                  >
                    {deletingId === client.id
                      ? "Deleting..."
                      : "Delete"}
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
