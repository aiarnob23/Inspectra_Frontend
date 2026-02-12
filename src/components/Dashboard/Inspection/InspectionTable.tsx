"use client"

import type { Inspection } from "@/features/inspection/inspectionApi"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { MoreHorizontalIcon } from "lucide-react"
import { useDeleteInspectionMutation } from "@/features/inspection/inspectionApi"
import { useState } from "react"

interface Props {
  inspections: Inspection[]
  isLoading: boolean
  isError: boolean
}

export default function InspectionsTable({
  inspections,
  isLoading,
  isError,
}: Props) {
  const [deleteInspection] =
    useDeleteInspectionMutation()

  const [deletingId, setDeletingId] =
    useState<string | null>(null)

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await deleteInspection(id).unwrap()
    } catch {
      console.error("Delete failed")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Frequency</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Scheduled At</TableHead>
          <TableHead className="text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center py-6"
            >
              Loading...
            </TableCell>
          </TableRow>
        )}

        {isError && (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center py-6 text-red-500"
            >
              Failed to load inspections
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          inspections.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6"
              >
                No inspections found
              </TableCell>
            </TableRow>
          )}

        {inspections.map((inspection) => (
          <TableRow key={inspection.id}>
            <TableCell>
              {inspection.client?.name}
            </TableCell>

            <TableCell>
              {inspection.asset?.name}
            </TableCell>

            <TableCell>
              {inspection.frequency}
            </TableCell>

            <TableCell>
              {inspection.status}
            </TableCell>

            <TableCell>
              {new Date(
                inspection.scheduledAt
              ).toLocaleString()}
            </TableCell>

            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      handleDelete(inspection.id)
                    }
                    disabled={
                      deletingId === inspection.id
                    }
                  >
                    {deletingId ===
                    inspection.id
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
