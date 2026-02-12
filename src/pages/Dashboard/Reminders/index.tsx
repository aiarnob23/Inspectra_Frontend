"use client"

import { useState } from "react"
import { useGetRemindersQuery } from "@/features/reminder/reminderApi"
import RemindersTable from "@/components/Dashboard/Reminders/ReminderTable"
import AppPagination from "@/components/Common/AppPagination"

export default function RemindersPage() {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } =
    useGetRemindersQuery({ page, limit: 20 })

  const reminders = data?.data ?? []
  const totalPages = data?.meta.pagination.totalPages ?? 1

  return (
    <div className="px-12">
      <h1 className="text-3xl font-bold mb-8">Reminders</h1>

      <RemindersTable
        reminders={reminders}
        isLoading={isLoading}
        isError={isError}
      />

      <AppPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
