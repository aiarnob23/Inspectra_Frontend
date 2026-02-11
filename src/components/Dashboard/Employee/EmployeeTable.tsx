"use client"

import {
  useDeleteEmployeeMutation,
} from "@/features/employee/employeeApi"

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
import type { Employee } from "@/features/employee/employeeApi"

interface Props {
  employees: Employee[]
  isLoading: boolean
  isError: boolean
}

export default function EmployeesTable({
  employees,
  isLoading,
  isError,
}: Props) {

  const [deleteEmployee] =
    useDeleteEmployeeMutation()

  const [deletingId, setDeletingId] =
    useState<string | null>(null)

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await deleteEmployee(id).unwrap()
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
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
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
              Failed to load employees
            </TableCell>
          </TableRow>
        )}

        {!isLoading && employees.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-6">
              No employees found
            </TableCell>
          </TableRow>
        )}

        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.phone ?? "-"}</TableCell>

            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      handleDelete(employee.id)
                    }
                    disabled={deletingId === employee.id}
                  >
                    {deletingId === employee.id
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
