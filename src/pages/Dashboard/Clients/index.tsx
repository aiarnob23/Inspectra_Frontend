"use client"

import { useState } from "react"
import ClientsTable from "@/components/Dashboard/Clients/ClientsTable"
import OpenModal from "@/components/Modal/openModal"
import { Button } from "@/components/ui/button"
import { useGetClientsQuery } from "@/features/clients/clientApi"
import AppPagination from "@/components/Common/AppPagination"
import { Download, File } from "lucide-react"
import { useExportClientCSVMutation } from "@/features/clients/clientApi"
import { useExport } from "@/hooks/useExport"

export default function Clients() {

  const [page, setPage] = useState(1)

  const { data, isLoading, isError } =
    useGetClientsQuery({ page, limit: 20 })

  const clients = data?.data ?? []
  const totalPages =
    data?.meta.pagination.totalPages ?? 1

  const [exportCSV, { isLoading: exporting }] =
    useExportClientCSVMutation()

  const { handleExport } = useExport(
    () => exportCSV().unwrap(),
    "clients.csv"
  )

  return (
    <div className="px-12">

      {/* Header */}
      <section className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients</h1>

        <div className="flex items-center gap-4">
          <Button variant="outline">
            <File /> CSV upload
          </Button>

          <Button
            variant="outline"
            onClick={handleExport}
          >
            <Download />
            {exporting ? "Exporting..." : "Export"}
          </Button>

          <OpenModal
            modals={[
              { modalId: "modal", openId: "add-client" }
            ]}
          >
            <Button>+ Add Clients</Button>
          </OpenModal>
        </div>
      </section>

      {/* Table */}
      <section className="mt-8">
        <ClientsTable
          clients={clients}
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
