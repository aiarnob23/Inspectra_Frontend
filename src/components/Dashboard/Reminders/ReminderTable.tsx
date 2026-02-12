"use client"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

import { useDeleteReminderMutation } from "@/features/reminder/reminderApi"
import { Button } from "@/components/ui/button"

interface Props {
  reminders: any[]
  isLoading: boolean
  isError: boolean
}

export default function RemindersTable({
  reminders,
  isLoading,
  isError,
}: Props) {
  const [deleteReminder] = useDeleteReminderMutation()

  const handleDelete = async (id: string) => {
    await deleteReminder(id).unwrap()
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Scheduled</TableHead>
          <TableHead>Attempts</TableHead>
          <TableHead className="text-right">Action</TableHead>
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
            <TableCell colSpan={7} className="text-center text-red-500">
              Failed to load reminders
            </TableCell>
          </TableRow>
        )}

        {!isLoading && reminders.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No reminders found
            </TableCell>
          </TableRow>
        )}

        {reminders.map((r) => (
          <TableRow key={r.id}>
            <TableCell>{r.inspection.client.name}</TableCell>
            <TableCell>{r.inspection.asset.name}</TableCell>
            <TableCell>{r.method}</TableCell>
            <TableCell>{r.status}</TableCell>
            <TableCell>
              {new Date(r.scheduledAt).toLocaleString()}
            </TableCell>
            <TableCell>{r.attempts}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(r.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
