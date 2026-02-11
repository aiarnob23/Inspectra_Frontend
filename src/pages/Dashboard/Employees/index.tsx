"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import OpenModal from "@/components/Modal/openModal"
import AppPagination from "@/components/Common/AppPagination"
import EmployeesTable from "@/components/Dashboard/Employee/EmployeeTable"
import { useGetEmployeesQuery } from "@/features/employee/employeeApi"

export default function Employees() {

  const [page, setPage] = useState(1)

  const { data, isLoading, isError } =
    useGetEmployeesQuery({ page, limit: 20 })

  const employees = data?.data ?? []
  const totalPages =
    data?.meta.pagination.totalPages ?? 1

  return (
    <div className="px-12">

      {/* Header */}
      <section className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Employees
        </h1>

        <OpenModal
          modals={[
            { modalId: "modal", openId: "add-employee" }
          ]}
        >
          <Button>+ Add Employee</Button>
        </OpenModal>
      </section>

      {/* Table */}
      <section className="mt-8">
        <EmployeesTable
          employees={employees}
          isLoading={isLoading}
          isError={isError}
        />

        <AppPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>
    </div>
  )
}
