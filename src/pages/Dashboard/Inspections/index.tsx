"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import OpenModal from "@/components/Modal/openModal"
import AppPagination from "@/components/Common/AppPagination"
import { useGetInspectionsQuery } from "@/features/inspection/inspectionApi"
import InspectionsTable from "@/components/Dashboard/Inspection/InspectionTable"

export default function Inspections() {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } =
    useGetInspectionsQuery({
      page,
      limit: 20,
    })

  const inspections = data?.data ?? []
  const totalPages =
    data?.meta?.pagination?.totalPages ?? 1

  return (
    <div className="px-12">
      {/* Header */}
      <section className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Inspections
        </h1>

        <OpenModal
          modals={[
            {
              modalId: "modal",
              openId: "add-inspection",
            },
          ]}
        >
          <Button className="active:scale-98">
            + Schedule Inspection
          </Button>
        </OpenModal>
      </section>

      {/* Table */}
      <section className="mt-8 space-y-6">
        <InspectionsTable
          inspections={inspections}
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
