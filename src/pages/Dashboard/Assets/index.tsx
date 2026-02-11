"use client"

import { useState } from "react"
import AssetsTable from "@/components/Dashboard/Asset/AssetsTable"
import OpenModal from "@/components/Modal/openModal"
import { Button } from "@/components/ui/button"
import { useGetAssetsQuery } from "@/features/asset/assetApi"
import AppPagination from "@/components/Common/AppPagination"

export default function Assets() {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } =
    useGetAssetsQuery({ page, limit: 20 })

  const assets = data?.data ?? []
  console.log(data)
  const totalPages = data?.meta.pagination.totalPages ?? 1

  return (
    <div className="px-12">
      {/* Header */}
      <section className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Assets</h1>

        <OpenModal
          modals={[
            {
              modalId: "modal",
              openId: "add-asset",
            },
          ]}
        >
          <Button className="active:scale-98">
            + Add Asset
          </Button>
        </OpenModal>
      </section>

      {/* Table */}
      <section className="mt-8">
        <AssetsTable
          assets={assets}
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
